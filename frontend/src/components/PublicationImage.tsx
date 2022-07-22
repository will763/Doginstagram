import { ChangeEvent, useEffect, useRef, useState } from "react";
import { RestartPublish } from "./RestartPublish";
import { VerifyImage } from "./VerifyImage";

interface Props {
    handleVisibility: () => void;
}


export const PublicationImage = ({handleVisibility}: Props) => {
    const [urlImage, setUrlImage] = useState<string | ArrayBuffer | null>(null);
    const [match, setMatch] = useState(false);
    const [file, setFile] = useState<File>();
    const [legend, setLegend] = useState('');

    const detectImage = (e: ChangeEvent<HTMLInputElement>) => {
      if(e.target.files) setFile(e.target.files[0]);
      const input = e.target;
      const reader = new FileReader(); 
      reader.onload = () => { setUrlImage(reader.result); }

      input.files && reader.readAsDataURL(input.files[0]);
    }

    function handleLegend(arg:string) {
      setLegend(arg)
    }
  
    function noMatch() {
      setMatch(true)
    }

    function matchOn() {
      setMatch(false)
    }

    function restart() {
      handleVisibility();
    }

    function allowDrop(ev: React.DragEvent<HTMLElement>) {
      ev.preventDefault();
    }

    function drop(ev: React.DragEvent<HTMLElement>) {
      ev.preventDefault();
      const reader = new FileReader(); 
      reader.onload = () => { setUrlImage(reader.result)}
      
      reader.readAsDataURL(ev.dataTransfer.files[0]);
    }

    return (
        <>
        <section
         className="fixed z-50 font-roboto w-screen h-screen bg-black/70 grid place-items-center"
         onClick={handleVisibility}
        >
          <figure>
            <img 
             className="fixed cursor-pointer top-8 h-4 w-4 right-8 invert" 
             src="/images/close.png" 
             onClick={handleVisibility}
             alt="close to section of publication" />
          </figure>
        </section>
        <main 
         id="drag_area"
         className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-[25rem] xs:w-[calc(100%-20%)] xxs:w-[calc(100%-10%)] h-[30rem] rounded-xl bg-white"
         onDragOver={allowDrop}
         onDrop={drop}
        >
            <header className="border-b h-12 border-b-[black]/20">
                { urlImage === null
                  ? 
                    <h1 className="text-center pt-3 font-bold tracking-wide text-black/90">
                        Create new post
                    </h1>
                  :
                    <RestartPublish file={file} legend={legend} restart={restart} match={match} />
                }
            </header>
            { urlImage
              ?
               <VerifyImage url={urlImage as string} legend={legend} handleLengend={handleLegend} match={match} matchOn={matchOn} noMatch={noMatch} />
              :
               <div className=" flex flex-col items-center">
                  <figure className="mt-24">
                    <img height={65} width={65} src="/images/image-gallery.png" alt="photo background" />
                  </figure>
                  <p className="mt-4 font-light  text-2xl tracking-wide text-black/90">Drag photos here</p>
                  <label className="mt-6 cursor-pointer bg-[#0095f6] w-max py-1 px-2 rounded-[.2rem] text-white font-bold text-sm tracking-wide" htmlFor="publish">
                     Select from computer
                     <input className="hidden" type="file" accept="image/png, image/jpeg" formEncType="multipart/form-data" onChange={detectImage} name="publish" id="publish" />
                  </label>
               </div>
            }
          </main>
        </>
    )
}