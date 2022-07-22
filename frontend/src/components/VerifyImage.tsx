import axios from "axios";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import defaultPerfil from '/images/user.png'
import { onlydog } from "../utils/onlyDogs";
import { Username } from "./Username";

declare let ml5: any;

interface Props {
    url: string
    noMatch: () => void
    matchOn: () => void
    match: boolean
    handleLengend: (arg:string) => void
    legend: string
}

export const VerifyImage = ({url, legend, handleLengend, noMatch, match, matchOn}: Props) => {
    const imgRef = useRef(null);
    const [user, setUser] = useState(localStorage.getItem('user'));
    
    const styledImgPublishing = 'h-[15rem] max-h-[27rem] w-full';
    const fetcher = (url:string) => axios.get(import.meta.env.VITE_API_URL + url, {headers: {'Authorization' : `${user}` }}).then(res => res.data);
    const { data, error } = useSWR('/users/profile/image', fetcher, {refreshInterval:50});


    function modelLoaded() {
      console.log('Model Loaded!');
    }

    function handleTextArea(e: React.ChangeEvent<HTMLTextAreaElement>) {
      e.preventDefault();
      handleLengend(e.target.value);
    }

    useEffect(()=> {
      const objectDetector = ml5?.objectDetector('cocossd', {}, modelLoaded);
      if(imgRef.current) {
        objectDetector.detect(imgRef.current, (err:any, results:any) => {
          onlydog(results, noMatch, matchOn);
        }, [imgRef]);
      }
    }, []);

    return (
        <section className="flex flex-col">
          <picture>
            <img src={url} ref={imgRef} className={url ? styledImgPublishing : ''} crossOrigin="anonymous"  alt="image to upload" />
          </picture>
          { match 
            ? 
             <div className="flex flex-col items-start mt-4 mx-8">
               <div className="flex items-center gap-2">
                 <img className='rounded-full cursor-pointer xs:flex-none h-11 w-11' src={data ? data : defaultPerfil} alt="image of profile" />
                 <Username />
               </div>
               <textarea 
                name="publish" 
                id="publish"
                placeholder="write a caption"
                onChange={handleTextArea}
                value={legend}
                className="border w-[100%] text-sm mt-1 p-2 h-28 outline-none resize-none border-black/20 text-black/80 rounded-md"
               >
               </textarea>
             </div>
            : 
             <div className="grid place-items-center h-32">
               <p className="text-red-500 text-center w-[70%] font-semibold">
                 It is only allowed to upload images that contain dogs.
               </p>
             </div>
          }
        </section>
    )
}