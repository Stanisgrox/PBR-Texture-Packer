import { WorkerData } from "../components/canvas";
import { RGBToGrayScale } from "./RGBToGrayscale";

self.onmessage = (event: MessageEvent<WorkerData>) => {
    for (var i = 0; i < event.data.pixelsR.length; i+=4) {
        //Red conversion
        const red_R = event.data.pixelsR[i];
        const green_R = event.data.pixelsR[i + 1];
        const blue_R = event.data.pixelsR[i + 2];
        const grayscaleR = RGBToGrayScale(red_R, green_R, blue_R);
        //Green conversion
        const red_G = event.data.pixelsG[i];
        const green_G = event.data.pixelsG[i + 1];
        const blue_G = event.data.pixelsG[i + 2];
        const grayscaleG = RGBToGrayScale(red_G, green_G, blue_G);
        //Blue conversion
        const red_B = event.data.pixelsB[i];
        const green_B = event.data.pixelsB[i + 1];
        const blue_B = event.data.pixelsB[i + 2];
        const grayscaleB = RGBToGrayScale(red_B, green_B, blue_B);
        //Alpha conversion
        const red_A = event.data.pixelsA[i];
        const green_A = event.data.pixelsA[i + 1];
        const blue_A = event.data.pixelsA[i + 2];
        const grayscaleA = RGBToGrayScale(red_A, green_A, blue_A);

        event.data.pixelsR[i] = grayscaleR;
        event.data.pixelsR[i + 1] = grayscaleG;
        event.data.pixelsR[i + 2] = grayscaleB;
        event.data.pixelsR[i + 3] = event.data.aSrc? grayscaleA : !event.data.rSrc? RGBToGrayScale(0, 0, 0) : RGBToGrayScale(255, 255, 255);
    }

    self.postMessage(event.data.pixelsR);
};