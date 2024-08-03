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

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps> ( function (props, ref: MutableRefObject<HTMLCanvasElement>) {

    //const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
        
        for (var i = 0; i < pixelsR.length; i+=4) {
            //Red conversion
            const red_R = pixelsR[i];
            const green_R = pixelsR[i + 1];
            const blue_R = pixelsR[i + 2];
            const grayscaleR = RGBToGrayScale(red_R, green_R, blue_R);
            //Green conversion
            const red_G = pixelsG[i];
            const green_G = pixelsG[i + 1];
            const blue_G = pixelsG[i + 2];
            const grayscaleG = RGBToGrayScale(red_G, green_G, blue_G);
            //Blue conversion
            const red_B = pixelsB[i];
            const green_B = pixelsB[i + 1];
            const blue_B = pixelsB[i + 2];
            const grayscaleB = RGBToGrayScale(red_B, green_B, blue_B);
            //Alpha conversion
            const red_A = pixelsA[i];
            const green_A = pixelsA[i + 1];
            const blue_A = pixelsA[i + 2];
            const grayscaleA = RGBToGrayScale(red_A, green_A, blue_A);

            pixelsR[i] = grayscaleR;
            pixelsR[i + 1] = grayscaleG;
            pixelsR[i + 2] = grayscaleB;
            pixelsR[i + 3] = props.a_imgSrc? grayscaleA : !props.r_imgSrc? RGBToGrayScale(0, 0, 0) : RGBToGrayScale(255, 255, 255);
        }

        context.putImageData(imageDataR, 0, 0);
        const resultImg = props.res_imgRef.current as HTMLImageElement;
        resultImg.src = canvas.toDataURL();

        console.timeEnd('Rewrite Canvas');

    }, [props]);


    return (
        <canvas ref={ref} className="hidden" />
    )
});