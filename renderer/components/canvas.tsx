import { forwardRef, MutableRefObject, useEffect, useRef } from "react";
import { RGBToGrayScale } from "../utils/RGBToGrayscale";

type Canvas = JSX.IntrinsicElements['canvas'];

interface CanvasProps extends Canvas {
    r_imgRef?: MutableRefObject<any>,
    g_imgRef?: MutableRefObject<any>,
    b_imgRef?: MutableRefObject<any>,
    a_imgRef?: MutableRefObject<any>,

    res_imgRef?: MutableRefObject<any>,

    r_imgSrc?: string,
    g_imgSrc?: string,
    b_imgSrc?: string,
    a_imgSrc?: string

    saver: boolean
};

export interface WorkerData {
    pixelsR: Uint8ClampedArray;
    pixelsG: Uint8ClampedArray;
    pixelsB: Uint8ClampedArray;
    pixelsA: Uint8ClampedArray;
    aSrc: boolean;
    rSrc: boolean;
};

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps> ( function (props, ref: MutableRefObject<HTMLCanvasElement>) {

    useEffect(() => {
        console.time('Rewrite Canvas');

        const canvas = ref.current as HTMLCanvasElement;
        const context = canvas.getContext('2d');

        const imageR = props.r_imgRef.current as HTMLImageElement;
        const imageG = props.g_imgRef.current as HTMLImageElement;
        const imageB = props.b_imgRef.current as HTMLImageElement;
        const imageA = props.a_imgRef.current as HTMLImageElement;

        canvas.width = imageR.naturalWidth ? imageR.naturalWidth : 1;
        canvas.height = imageR.naturalHeight ? imageR.naturalHeight : 1;

        context.drawImage(imageR, 0, 0);
        const imageDataR = context.getImageData(0, 0, canvas.width, canvas.height);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(imageG, 0, 0);
        const imageDataG = context.getImageData(0, 0, canvas.width, canvas.height);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(imageB, 0, 0);
        const imageDataB = context.getImageData(0, 0, canvas.width, canvas.height);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(imageA, 0, 0);
        const imageDataA = context.getImageData(0, 0, canvas.width, canvas.height);
        context.clearRect(0, 0, canvas.width, canvas.height);

        const pixelsR = imageDataR.data;
        const pixelsG = imageDataG.data;
        const pixelsB = imageDataB.data;
        const pixelsA = imageDataA.data;

        if (imageDataR.data.length != imageDataB.data.length || imageDataG.data.length != imageDataR.data.length) return;

        const threads = pixelsR.length > navigator.hardwareConcurrency? navigator.hardwareConcurrency : pixelsR.length
        const promises = [];

        const createWorkers = (i: number) => {
            return new Promise(function(resolve) {
                let worker = new Worker(new URL("../utils/conversionWorker", import.meta.url));
                const sendingData: WorkerData = {
                    pixelsR: pixelsR.slice(i * (pixelsR.length / threads), (i + 1) * (pixelsR.length / threads) > pixelsR.length? pixelsR.length : (i + 1) * (pixelsR.length / threads)),
                    pixelsG: pixelsG.slice(i * (pixelsG.length / threads), (i + 1) * (pixelsG.length / threads) > pixelsG.length? pixelsG.length : (i + 1) * (pixelsG.length / threads)),
                    pixelsB: pixelsB.slice(i * (pixelsB.length / threads), (i + 1) * (pixelsB.length / threads) > pixelsB.length? pixelsB.length : (i + 1) * (pixelsB.length / threads)),
                    pixelsA: pixelsA.slice(i * (pixelsA.length / threads), (i + 1) * (pixelsA.length / threads) > pixelsA.length? pixelsA.length : (i + 1) * (pixelsA.length / threads)),
                    aSrc: props.a_imgSrc? true : false,
                    rSrc: props.r_imgSrc? true : false
                }
                worker.postMessage(sendingData);
                worker.addEventListener('message', (message: MessageEvent<Uint8ClampedArray>) => {
                    resolve(message.data);
                })
            })
        };

        for (let i = 0; i < threads; i++){
            promises.push(createWorkers(i));
        };

        Promise.all(promises)
            .then((data: Uint8ClampedArray[]) => {
                let length = 0;
                data.forEach((chunk) => {
                    length = length + chunk.length;
                });
                const mergedData = new Uint8ClampedArray(length);
                let increment = 0 
                data.forEach((chunk) => {
                    mergedData.set(chunk, increment);
                    increment = increment + chunk.length
                });

                const newData = new ImageData(mergedData, canvas.width, canvas.height)

                context.putImageData(newData, 0, 0);
                const resultImg = props.res_imgRef.current as HTMLImageElement;
                resultImg.src = canvas.toDataURL();
        
                console.timeEnd('Rewrite Canvas');
            });

    }, [props]);


    return (
        <canvas ref={ref} className="hidden" />
    )
});