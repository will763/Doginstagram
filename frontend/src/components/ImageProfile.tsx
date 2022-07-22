import axios from "axios";
import { useState } from "react";
import useSWR from "swr";
import defaultPerfil from '/images/user.svg'

export const ImageProfile = () => {
    const [user, setUser] = useState(localStorage.getItem('user'));
    
    const fetcher = (url:string) => axios.get(import.meta.env.VITE_API_URL + url, {headers: {'Authorization' : `${user}` }}).then(res => res.data);
    const { data, error } = useSWR('/users/profile/image', fetcher, {refreshInterval:50});

    return (
        <>
          <img className="rounded-full w-40 h-40 lbig:w-20 lbig:h-20 border border-[#555555]" src={data ? data : defaultPerfil} alt="perfil image" />
        </>
    )
}