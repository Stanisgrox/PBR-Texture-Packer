import { WorkerData } from "../components/canvas";
import { RGBToGrayScale } from "./RGBToGrayscale";

self.onmessage = (event: MessageEvent<WorkerData>) => {
    const { pixelsR, pixelsG, pixelsB, pixelsA, aSrc, rSrc } = event.data;
    const alphaPresent = aSrc? true : false;
    const imagePresent = rSrc? 255 : 0;

    for (let i = 0; i < pixelsR.length; i += 4) {
        pixelsR[i] = RGBToGrayScale(pixelsR[i], pixelsR[i + 1], pixelsR[i + 2]);
        pixelsR[i + 1] = RGBToGrayScale(pixelsG[i], pixelsG[i + 1], pixelsG[i + 2]);
        pixelsR[i + 2] = RGBToGrayScale(pixelsB[i], pixelsB[i + 1], pixelsB[i + 2]);
        pixelsA[i + 3] = alphaPresent? RGBToGrayScale(pixelsA[i], pixelsA[i + 1], pixelsA[i + 2]) : imagePresent;
    }

    self.postMessage(pixelsR);
    self.close();
};
