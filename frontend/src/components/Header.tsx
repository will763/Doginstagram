import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useSWR, { useSWRConfig } from "swr";
import { Logo } from "./Logo"
import { PublicationImage } from "./PublicationImage";
import defaultPerfil from '/images/user.png'

interface Props {
  urlProfile?: (url:string) => void
}

export const Header = ({urlProfile}: Props) => {
    const [isPublishing, setIsPublishing] = useState(false);
    const [user, setUser] = useState(localStorage.getItem('user'));
    const navigate= useNavigate();  

    const handleVisibility = () => setIsPublishing(false);

    const fetcher = (url:string) => axios.get(import.meta.env.VITE_API_URL + url, {headers: {'Authorization' : `${user}` }}).then(res => res.data);
    const { data, error } = useSWR('/users/profile/image', fetcher, {refreshInterval:50});

    useEffect(()=> {
      if(urlProfile)
      urlProfile(data);
    })
    
    useEffect(()=> {       
      if (!user) 
         navigate('/login', {replace: true}); 
    }, []);
 
    return (
        <>
         {isPublishing ? <PublicationImage handleVisibility={handleVisibility} /> : null}
        <header className="bg-white border-b z-30 border-b-black/20 h-[4.1rem] fixed top-0 w-full px-7 left-0 flex justify-center big:justify-between big:gap-0 gap-[37.5rem] items-center">
            <Link to={'/'}>
              <div>
                <Logo size={true} />
              </div>
            </Link>            
            <section className="flex gap-10 lbig:gap-6 items-center">
                <Link to={'/'}>
                  <div >
                    <img className="w-7 h-7 lbig:w-6 lbig:h-6 max-w-[1.75rem] max-h-[1.75rem] cursor-pointer" src="/images/home.png" alt="icon home" />
                  </div>
                </Link>  
                <div>
                    <img 
                     className="w-7 h-7 lbig:w-6 lbig:h-6 max-w-[1.75rem] max-h-[1.75rem] cursor-pointer" 
                     src="/images/plus.png" 
                     onClick={() => setIsPublishing(true)}
                     alt="icon plus" />
                </div>
                <Link to={'/profile'}>
                  <figure className="w-8 h-8 lbig:w-7 lbig:h-7 rounded-full cursor-pointer border border-black grid place-items-center">
                    <img className="rounded-full w-7 h-7 lbig:w-6 lbig:h-6 max-w-[1.75rem] max-h-[1.75rem]" src={data ? data : defaultPerfil} alt="perfil image" />
                  </figure>
                </Link>
            </section>
        </header>
        </>
    )
}