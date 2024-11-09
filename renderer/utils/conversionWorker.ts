import { WorkerData } from "../components/canvas";
import { RGBToGrayScale } from "./RGBToGrayscale";

self.onmessage = (event: MessageEvent<WorkerData>) => {

    const { pixelsR, pixelsG, pixelsB, pixelsA, aSrc, rSrc } = event.data;

    for (var i = 0; i < pixelsR.length; i+=4) {
        pixelsR[i] =  RGBToGrayScale(pixelsR[i], pixelsR[i + 1], pixelsR[i + 2]);
        pixelsR[i + 1] = RGBToGrayScale(pixelsG[i], pixelsG[i + 1], pixelsG[i + 2]);
        pixelsR[i + 2] = RGBToGrayScale(pixelsB[i], pixelsB[i + 1], pixelsB[i + 2]);
        pixelsR[i + 3] = aSrc? RGBToGrayScale(pixelsA[i], pixelsA[i + 1], pixelsA[i + 2]) : !rSrc? 0 : 255;
    }

    self.postMessage(pixelsR);
    self.close();
};