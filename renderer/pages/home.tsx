import { ChangeEvent, useRef, useState } from "react";
import { Canvas } from "../components/canvas";
import MetaHeader from "../foundations/MetaHeader";
import { fileValidation } from "../utils/FileValidation";
import { Footer } from "../components/footer";
import { saveImage } from "../utils/saveImage";

const Home = () => {

  const redImg = useRef(null);
  const greenImg = useRef(null);
  const blueImg = useRef(null);
  const resultImg = useRef(null);
  const form = useRef(null);
  const canvas = useRef(null);
  
  function loadImageFromFile (e: ChangeEvent<HTMLInputElement>, channel: string) {
    const input = e.target;
    const file = input.files[0];
    if (!fileValidation(file)) return false;
    switch (channel) {
      case "red":setRedImageURL(URL.createObjectURL(file)); break;
      case "green":setGreenImageURL(URL.createObjectURL(file)); break;
      case "blue":setBlueImageURL(URL.createObjectURL(file));break;
    }
  }

  function clearFiles () {
    setRedImageURL('');
    setGreenImageURL('');
    setBlueImageURL('');
    (form.current as HTMLFormElement).reset();
    setSaver(!saver);
  }

  const [redImageURL, setRedImageURL] = useState("");
  const [greenImageURL, setGreenImageURL] = useState("");
  const [blueImageURL, setBlueImageURL] = useState("");
  const [saver, setSaver] = useState(false);


  return (
    <>
      <MetaHeader title="Stanisgrox's PBR Texture Packer" />
      <div className="text-center w-full pl-2 pr-2">
        <h2 className="mb-2 mt-2 text-blue-200">
          Step I - Load your textures
        </h2>
        <form 
          className="flex flex-col border-2 p-4 rounded-3xl shadow-xl border-blue-200" 
          ref = {form}
          style={{
            background: 'linear-gradient(0deg, rgba(22,28,35,1) 0%, rgba(34,43,54,1) 100%)'
          }}
        >
          <div className="flex justify-around">
            <div className = "w-4/12 max-w-lg min-h-[512px] flex flex-col">
              <img ref={redImg} src={redImageURL} className="max-w-lg ml-auto mr-auto"/>
              <div className="mt-auto">
                <div className="flex flex-col mt-2">
                  <input type="file" name="red" accept="image/*" onChange={(e) => loadImageFromFile(e, "red")} className="mr-auto ml-auto"/>
                  <label htmlFor="red" className="text-red-500">Red</label>
                </div>
              </div>
            </div>
            <div className = "w-4/12 max-w-lg min-h-[512px] flex flex-col">
              <img ref={greenImg} src={greenImageURL} className="max-w-lg ml-auto mr-auto"/>
              <div className="mt-auto">
                <div className="flex flex-col mt-2">
                  <input type="file" name="green" accept="image/*" onChange={(e) => loadImageFromFile(e, "green")} className="mr-auto ml-auto"/>
                  <label htmlFor="green" className="text-green-500">Green</label>
                </div>
              </div>
            </div>
            <div className = "w-4/12 max-w-lg min-h-[512px] flex flex-col">
              <img ref={blueImg} src={blueImageURL} className="max-w-lg ml-auto mr-auto"/>
              <div className="mt-auto">
                <div className="flex flex-col mt-2">
                  <input type="file" name="blue" id="blue" accept="image/*" onChange={(e) => loadImageFromFile(e, "blue")} className="mr-auto ml-auto"/>
                  <label htmlFor="blue" className="text-blue-500">Blue</label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button 
              onClick={() => clearFiles()} 
              className="mt-4 mb-1 text-lg bg-slate-900 pt-3 pb-3 pl-8 pr-8 rounded-3xl"
            >
              Clear images
            </button>
          </div>          
        </form>
        <p className="mt-2 text-sm">
          <b className="text-lg">
            Textures must have same resolution for each channel. 
          </b>
          <br/>
          Use only 8-bit textures (not suitable for HDR textures and Normal Maps). Any color will be converted to grayscale first. Only <span className="text-red-500">red</span> channel is mandatory.
        </p>
        <h2 className="mb-2 mt-3 text-blue-200">
          Step II - Verify your packed texture
        </h2>
        <div 
          className="border-2 rounded-3xl shadow-xl border-blue-200"
          style={{
            background: 'linear-gradient(0deg, rgba(22,28,35,1) 0%, rgba(25,32,40,1) 100%)'
          }}
        >
          <Canvas 
            r_imgRef = {redImg} 
            g_imgRef = {greenImg} 
            b_imgRef = {blueImg}
            r_imgSrc = {redImageURL} 
            g_imgSrc = {greenImageURL} 
            b_imgSrc = {blueImageURL}
            saver = {saver}
            res_imgRef = {resultImg} 
            className = "ml-auto mr-auto"
            ref={canvas}
          />
          <img ref={resultImg} className="w-2/5 mr-auto ml-auto mt-2"/>
          <p 
            className="mt-5 text-red-700 text-lg"
            style={{
              animationDuration: '3s',
              animationName: 'pulseRed',
              animationIterationCount: 'infinite',
              animationDirection: 'alternate'
            }}
          >
            Re-generate your picture after changing textures!
          </p>
          <button onClick={() => setSaver(!saver)} className="mt-2 mb-2 text-3xl bg-slate-900 pt-3 pb-3 pl-12 pr-12 rounded-3xl">
            GENERATE
          </button>
        </div>
        <div className="mb-6 mt-4">
          <button 
            onClick={() => {
              const bytes = (canvas.current as HTMLCanvasElement).toDataURL();
              const imageName = 'PBR_Channels_Packed';
              saveImage(bytes, imageName);
            }} 
            className="mt-2 mb-4 text-3xl bg-green-900 pt-3 pb-3 pl-20 pr-20 rounded-3xl"
          >
            SAVE
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;