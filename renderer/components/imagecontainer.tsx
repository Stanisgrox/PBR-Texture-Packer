import { forwardRef, MutableRefObject } from "react";

type Div = JSX.IntrinsicElements['canvas'];

interface ImageContainerProps extends Div {
    imageSrc: string
    channelName: string
    loadFunc: any
};

export const ImageContainer = forwardRef<HTMLDivElement, ImageContainerProps>( function(props,  ref: MutableRefObject<HTMLImageElement>) {

    const channel = props.channelName.toLowerCase();

    return(
        <div className = "w-4/12 max-w-lg min-h-[512px] flex flex-col">
            <img ref={ref} src={props.imageSrc} className="max-w-lg ml-auto mr-auto"/>
            <div className="mt-auto">
                <div className="flex flex-col mt-2">
                  <input type="file" name={channel} accept="image/*" onChange={(e) => props.loadFunc(e, channel)} className="mr-auto ml-auto"/>
                  <label htmlFor={channel} className={`${channel}`}>{props.channelName}</label>
                </div>
            </div>
        </div>
    )
})