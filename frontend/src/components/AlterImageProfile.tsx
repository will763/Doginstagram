import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { deleteImageProfile, setImageProfile } from "../services/services";
import { onlydog } from "../utils/onlyDogs";

declare let ml5: any;

interface Props {
  cancelAlterImage: () => void
}

export const AlterImageProfile = ({ cancelAlterImage }: Props) => {
  const [urlImage, setUrlImage] = useState<string | ArrayBuffer | null>('');
  const [match, setMatch] = useState<boolean | null>(null);
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [file, setFile] = useState<File>();
  const imgRef = useRef(null);

  const deleteImgProfile = () => {
    deleteImageProfile(user);
    cancelAlterImage();
  }


  const detectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) setFile(e.target.files[0]);
    const input = e.target;
    const reader = new FileReader();
    reader.onload = () => { setUrlImage(reader.result); }

    input.files && reader.readAsDataURL(input.files[0]);
  }

  function modelLoaded() {
    console.log('Model Loaded!');
  }

  function isMatch() {
    setMatch(true)
  }

  useEffect(() => {
    const objectDetector = ml5?.objectDetector('cocossd', {}, modelLoaded);
    if (imgRef.current) {
      objectDetector.detect(imgRef.current, (err: any, results: any) => {
        onlydog(results, isMatch);
      });

      const id = setTimeout(() => {
        match === null ? setMatch(false) : null;
      }, 1000)

      return () => clearTimeout(id);
    }
  }, [urlImage]);

  useEffect(() => {
    if (urlImage && match) {
      let formData = new FormData();
      formData.append('file', file as Blob);
      setImageProfile({formData, user})
      console.log(formData);
      cancelAlterImage();
    }
  }, [urlImage, match]);

  return (
    <section className="fixed z-50 font-roboto w-screen h-screen bg-black/70 grid place-items-center">
      <main className=" h-max w-[25rem] lbig:w-[18rem] bg-white rounded-xl divide-y divide-slate-400/30">
        {urlImage
          ?
          <picture>
            <img
              id="image_profile"
              className=" h-[15rem] w-[100%] rounded-t-xl"
              src={urlImage as string}
              crossOrigin="anonymous"
              alt="image for upload"
              ref={imgRef} />
          </picture>
          :
          null
        }
        {urlImage && match === false
          ?
          <section className="h-[14rem] flex justify-center pt-10 text-center">
            <div className="w-[60%]">
              <p className="text-red-500 font-semibold">
                It is only allowed to upload images that contain dogs.
              </p>
              <button
                onClick={() => { setUrlImage(''); setMatch(null) }}
                className='border w-[100%] rounded-[.3rem] py-2 tracking-wider mt-3 font-roboto  bg-blue-400 text-sm text-white font-bold'
              >
                return
              </button>
            </div>
          </section>
          :
          <div className="flex flex-col cursor-pointer text-center tracking-wider divide-y divide-slate-400/30">
            <h2 className="font-bold text-black/90 text-lg py-7">Change profile picture</h2>
            <label htmlFor="image-perfil" className="block cursor-pointer py-4 text-[#0095f6]/90 text-sm font-semibold active:bg-slate-400/30">
              Upload photo
              <input
                id="image-perfil"
                type="file"
                className="hidden"
                onChange={(e) => detectImage(e)}
                accept="image/png, image/jpeg"
                formEncType="multipart/form-data"
                name="image-perfil"
              />
            </label>
            <button className="text-red-500 text-sm font-semibold py-4 active:bg-slate-400/30" onClick={deleteImgProfile }>Remove current photo</button>
            <button className="text-sm py-4 active:bg-slate-400/30" onClick={cancelAlterImage}>Cancel</button>
          </div>
        }
      </main>
    </section>
  )
}