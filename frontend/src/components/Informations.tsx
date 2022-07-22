import axios from "axios";
import { useState } from "react";
import useSWR from "swr";

export const Informations = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const fetcher = (url:string) => axios.get(import.meta.env.VITE_API_URL + url, {headers: {'Authorization' : `${user}` }}).then(res => res.data);
  const { data, error } = useSWR('/users/profile', fetcher, {refreshInterval:50});


    return (
        <section className="flex font-roboto lbig:gap-0 lbig:justify-around gap-12 py-5 lbig:py-2 lbig:text-sm lbig:border-b border-b-black/20">
            <div className="flex gap-1 lbig:flex-col lbig:items-center lbig:gap-0">
               <span className="font-bold text-black/[.87]">{data?.publications}</span>
               <p className="text-black/[.85] lbig:text-black/50">publications</p>
            </div>
            <div className="flex gap-1 lbig:flex-col lbig:items-center lbig:gap-0">
               <span className="font-bold text-black/[.87]">{data?.followers.length}</span>
               <p className="text-black/[.85] lbig:text-black/50">followers</p>
            </div>
            <div className="flex gap-1 lbig:flex-col lbig:items-center lbig:gap-0">
               <span className="font-bold text-black/[.87]">{data?.following.length}</span>
               <p className="text-black/[.85] lbig:text-black/50">following</p>
            </div>
        </section>
    )
}