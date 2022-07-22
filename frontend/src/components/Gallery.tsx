import axios from "axios";
import React, { useState } from "react"
import useSWR from "swr";
import { ItemGallery } from "./ItemGallery"
import { NoPublication } from "./NoPublication"

export const Gallery = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const fetcher = (url:string) => axios.get(import.meta.env.VITE_API_URL + url, {headers: {'Authorization' : `${user}` }}).then(res => res.data);
  const { data, error } = useSWR('/publication', fetcher, {refreshInterval:50});

  console.log(data);
  

    return (
        <section className="grid gap-8 lbig:gap-1 big:w-full w-max grid-cols-16 mb-10">
            {!data ? <NoPublication />
              :  
              <>
               {React.Children.toArray(
                 data.map((data:any)=> {
                    return <ItemGallery url={data?.url} likes={data?.likes} />
                 })
               )}
              </>
            }
        </section>
    )
}
//h-[calc(100vw-78vw)] min-h-[10rem] h-[17.6rem]