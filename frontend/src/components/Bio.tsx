import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"
import useSWR from "swr";
import { ImageProfile } from "./ImageProfile"
import { Informations } from "./Informations"

export const Bio = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const fetcher = (url:string) => axios.get(import.meta.env.VITE_API_URL + url, {headers: {'Authorization' : `${user}` }}).then(res => res.data);
  const { data, error } = useSWR('/users/profile', fetcher, {refreshInterval:50});


    return (
        <section>
        <div className="flex w-[84%] lbig:w-full gap-[8%] lbig:gap-6 ml-12 lbig:ml-6 justify-center lbig:justify-start">
            <figure className="w-40 h-40 lbig:w-20 lbig:h-20 rounded-full flex-none">
                <ImageProfile />
            </figure>
            <section>
            <div className="flex items-center lbig:flex-col lbig:items-start xxs:block xxs:w-[calc(100vw-50vw)] xxs:mr-[10%]">
                <h1 className="text-black/[.87] xxs:truncate font-medium text-3xl font-roboto">{data?.username}</h1>
                <Link to='/accounts/edit'>
                <button className="text-black/[.86] border border-black/20 rounded-[0.250rem] font-semibold text-[.87rem] h-8 w-28 lbig:w-[14rem] xxs:w-full xxs:flex-none ml-6 lbig:ml-0 lbig:mt-3 grid place-items-center">
                    <span>Edit profile</span>
                </button>
                </Link>
            </div>
            <div className="lbig:hidden">
                <Informations />
            </div>
            <p className="font-roboto block h-max lbig:hidden text-black/[.85]">{data?.biography}</p>
            </section>
        </div>
            <p className="font-roboto mt-6 hidden h-max mx-7 text-sm lbig:block text-black/[.85]">{data?.biography}</p>
        </section>
    )
}