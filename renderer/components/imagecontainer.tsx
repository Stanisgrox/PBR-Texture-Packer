import { ChangeEvent, forwardRef, MutableRefObject, SetStateAction, useEffect, useRef } from "react";
import { fileValidation } from "../utils/FileValidation";

type Div = JSX.IntrinsicElements['canvas'];

interface ImageContainerProps extends Div {
    imageSrc: string
    channelName: string
    saver: boolean
    loadFunc: (e: ChangeEvent<HTMLInputElement>, channel: string) => boolean
    setSaver?: (value: SetStateAction<boolean>) => void
    setImageURL?: (value: SetStateAction<string>) => void 
};

interface FileWithPath extends File {
    path: string
};

export const ImageContainer = forwardRef<HTMLDivElement, ImageContainerProps>( function(props,  ref: MutableRefObject<HTMLImageElement>) {

    const dndzone = useRef(null);
    const fileinput = useRef(null);
    const channel = props.channelName.toLowerCase();

    const dropHandler = (event: DragEvent) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0] as FileWithPath;
        if (event.dataTransfer.files.length > 1) return false; 
        if (!fileValidation(file)) return false;
        const input = fileinput.current as HTMLInputElement;
        input.value = '';

        props.setImageURL(URL.createObjectURL(file));
        props.setSaver(!props.saver);
    }

    return(
        <div className = "w-1/4 max-w-lg min-h-[512px] flex flex-col pl-1 pr-1">
            <div 
                className= "w-full h-full rounded-md border-2 border-dashed border-sky-200 hover:border-sky-400 aspect-square"
                ref={dndzone}
                onDragOver={(e) => {e.stopPropagation(); e.preventDefault()}}
                onDrop={(e) => dropHandler(e as unknown as DragEvent)}
            >
                <img 
                    ref={ref} 
                    src={props.imageSrc} 
                    className="max-w-lg ml-auto mr-auto w-full rounded-md" 
                    draggable="true"
                />
            </div>
            <div className="mt-auto">
                <div className="flex flex-col mt-2">
                  <input type="file" name={channel} accept="image/*" onChange={(e) => props.loadFunc(e, channel)} className="mr-auto ml-auto" ref={fileinput}/>
                  <label htmlFor={channel} className={`${channel}`}>{props.channelName}</label>
                </div>
            </div>
        </div>
    )
})