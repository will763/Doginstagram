import { useState, useEffect } from "react"
import { Bio } from "../components/Bio"
import { Gallery } from "../components/Gallery"
import { Header } from "../components/Header"
import { Informations } from "../components/Informations"
import { Publication } from "../components/Publication"
import { Loading } from "./Loading"

export const Profile = () => {
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
     const idInterval = setTimeout(()=> {
        setIsLoading(false);
      }, 1700);

      return () => clearTimeout(idInterval);
    }, [])

    return (
        <main className="bg-[#FAFAFA]">
         { isLoading ? <Loading />
            :
            <>
             <Header />
              <section className="bg-[#FAFAFA] h-max pt-24 lbig:pt-20 pb-9 lbig:pb-5">
               <Bio />
              </section>
             <section className="bg-[#FAFAFA] border-t border-t-black/20 flex flex-col items-center mx-auto w-max big:w-[inherit] big:mx-7 lbig:mx-0">
                <div className="w-full hidden lbig:block">
                    <Informations />
                </div>
                <Publication />
                <Gallery />
             </section>
            </>
        }
        </main>
    )
}

