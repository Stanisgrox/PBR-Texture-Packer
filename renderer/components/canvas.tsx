import { forwardRef, MutableRefObject, useCallback, useEffect, useRef } from "react";
import { closestDivider } from "../utils/closestDivider";

type Canvas = JSX.IntrinsicElements['canvas'];

interface CanvasProps extends Canvas {
    r_imgRef?: MutableRefObject<HTMLImageElement>,
    g_imgRef?: MutableRefObject<HTMLImageElement>,
    b_imgRef?: MutableRefObject<HTMLImageElement>,
    a_imgRef?: MutableRefObject<HTMLImageElement>,

    res_imgRef?: MutableRefObject<HTMLImageElement>,

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

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>((props, ref: MutableRefObject<any>) => {
    const workersRef = useRef<Worker[]>([]);

    const initWorkers = useCallback((threads: number) => {
        if (workersRef.current.length === 0) {
            for (let i = 0; i < threads; i++) {
                const worker = new Worker(new URL("../utils/conversionWorker", import.meta.url));
                workersRef.current.push(worker);
            }
        }
    }, []);

    useEffect(() => {
        console.time('Rewrite Canvas');

        const canvas = ref.current as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        
        const images = [
            props.r_imgRef.current as HTMLImageElement,
            props.g_imgRef.current as HTMLImageElement,
            props.b_imgRef.current as HTMLImageElement,
            props.a_imgRef.current as HTMLImageElement,
        ];

        canvas.width = images[0]?.naturalWidth || 1;
        canvas.height = images[0]?.naturalHeight || 1;

        const imageDataArray = images.map((image) => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, 0, 0);
            return context.getImageData(0, 0, canvas.width, canvas.height).data;
        });

        const [pixelsR, pixelsG, pixelsB, pixelsA] = imageDataArray;

        if (pixelsR.length !== pixelsG.length || pixelsB.length !== pixelsR.length || pixelsA.length !== pixelsR.length) return;

        const threads = closestDivider(pixelsR.length / 4, navigator.hardwareConcurrency);

        initWorkers(threads);

        const createWorkerPromises = () => {
            const promises = [];
            const chunkSize = pixelsR.length / threads;

            for (let i = 0; i < threads; i++) {
                const startIdx = i * chunkSize;
                const endIdx = Math.min((i + 1) * chunkSize, pixelsR.length);

                const sendingData: WorkerData = {
                    pixelsR: pixelsR.slice(startIdx, endIdx),
                    pixelsG: pixelsG.slice(startIdx, endIdx),
                    pixelsB: pixelsB.slice(startIdx, endIdx),
                    pixelsA: pixelsA.slice(startIdx, endIdx),
                    aSrc: !!props.a_imgSrc,
                    rSrc: !!props.r_imgSrc,
                };

                const worker = workersRef.current[i];

                if (worker) {
                    promises.push(
                        new Promise<Uint8ClampedArray>((resolve) => {
                            worker.postMessage(sendingData, [
                                sendingData.pixelsR.buffer,
                                sendingData.pixelsG.buffer,
                                sendingData.pixelsB.buffer,
                                sendingData.pixelsA.buffer,
                            ]);

                            worker.onmessage = ({ data }) => {
                                resolve(data);
                            };
                        })
                    );
                } else {
                    console.error(`Worker ${i} is not available`);
                }
            }
            return promises;
        };

        const processWorkers = async () => {
            const promises = createWorkerPromises();
            if (promises.length > 0) {
                try {
                    const imageDataChunks = await Promise.all(promises);

                    const length = imageDataChunks.reduce((sum, chunk) => sum + chunk.length, 0);
                    const mergedData = new Uint8ClampedArray(length);

                    let offset = 0;
                    for (const chunk of imageDataChunks) {
                        mergedData.set(chunk, offset);
                        offset += chunk.length;
                    }

                    const newData = new ImageData(mergedData, canvas.width, canvas.height);
                    context.putImageData(newData, 0, 0);

                    const resultImg = props.res_imgRef.current as HTMLImageElement;
                    canvas.toBlob((blob) => {
                        if (blob) {
                            resultImg.src = URL.createObjectURL(blob);
                        }
                    });
                } catch (error) {
                    console.error('Error processing workers:', error);
                }
            }
        };

        processWorkers();
        console.timeEnd('Rewrite Canvas');

        return () => {
            workersRef.current.forEach((worker) => worker.terminate());
            workersRef.current = [];
        };

    }, [props]);

    return <canvas ref={ref} className="hidden" />;
});
