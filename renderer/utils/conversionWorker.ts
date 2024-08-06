import { WorkerData } from "../components/canvas";
import { RGBToGrayScale } from "./RGBToGrayscale";

self.onmessage = (event: MessageEvent<WorkerData>) => {
    for (var i = 0; i < event.data.pixelsR.length; i+=4) {
        event.data.pixelsR[i] =  RGBToGrayScale(event.data.pixelsR[i], event.data.pixelsR[i + 1], event.data.pixelsR[i + 2]);
        event.data.pixelsR[i + 1] = RGBToGrayScale(event.data.pixelsG[i], event.data.pixelsG[i + 1], event.data.pixelsG[i + 2]);
        event.data.pixelsR[i + 2] = RGBToGrayScale(event.data.pixelsB[i], event.data.pixelsB[i + 1], event.data.pixelsB[i + 2]);
        event.data.pixelsR[i + 3] = event.data.aSrc? RGBToGrayScale(event.data.pixelsA[i], event.data.pixelsA[i + 1], event.data.pixelsA[i + 2]) : !event.data.rSrc? 0 : 255;
    }

    self.postMessage(event.data.pixelsR);
    self.close();
};