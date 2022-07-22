import axios from "axios";
import { useState } from "react";
import useSWR from "swr";

export const Username = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const fetcher = (url:string) => axios.get(import.meta.env.VITE_API_URL + url, {headers: {'Authorization' : `${user}` }}).then(res => res.data);
  const { data, error } = useSWR('/users/profile', fetcher);


    return (
        <>
        <span className='text-sm font-semibold text-black/90 '>{data?.username}</span>
        </>
    )
}