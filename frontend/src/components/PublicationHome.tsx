import axios from 'axios'
import { useState } from 'react'
import useSWR from 'swr'
import { deletePublication, incrementLikesPublication } from '../services/services'
import { HeartAnimation } from './HeartAnimation'
import threeDots from '/images/threedots.svg'
import defaultPerfil from '/images/user.png'

interface Props {
    id: number,
    url: string,
    author: string,
    legend: string
    likes: number
}

export const PublicationHome = ({id, author, legend, url, likes}: Props) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [doubleClick, setDoubleClick] = useState(false);
    const [like, setLike] = useState(likes ? true : false);
    const [user, setUser] = useState(localStorage.getItem('user'));

    const fetcher = (url:string) => axios.get(import.meta.env.VITE_API_URL + url, {headers: {'Authorization' : `${user}` }}).then(res => res.data);
    const { data, error } = useSWR('/users/profile/image', fetcher);

    const startAnimationDoubleClick = () => {
      setDoubleClick(true);
      setLike(true);
      incrementLikes();
      setTimeout(()=> {
        setDoubleClick(false);
      }, 1000)
    }

    const incrementLikes = () => {
      setLike(true);
      if(user)
      incrementLikesPublication(user, id);
    }

    const deleteThisPublicaion = () => {
      setIsDeleting(!isDeleting)
      if(user)
      deletePublication(user, id)
    }


    return (
        <section className='relative max-h-max lbig:w-[calc(100%-20%)] bg-white border border-[#000000]/20  w-[calc(100%-50%)] max-w-[26rem] rounded-lg flex-none'>
            <header className='flex justify-between items-center px-3 pt-2 pb-3'>
             <div className='flex items-center gap-2'>
               <figure className='w-10 h-10 rounded-full grid place-items-center'>
                <img className='w-9 h-9 border border-[#000000]/90 rounded-full' src={data ? data : defaultPerfil} alt="image perfil" />
               </figure>
               <h4 className='font-semibold tracking-wide text-sm text-[#000000]/80'>{author}</h4>
             </div>
             <div>
               <img className='w-16 h-8 cursor-pointer' src={threeDots} alt="threedots images" onClick={()=> setIsDeleting(!isDeleting)} />
             </div>
             { isDeleting
               ? <div className='absolute z-50 grid place-items-center top-12 right-8 w-[20%] h-10 bg-white border-[.1rem] rounded-b-2xl rounded-tl-2xl border-black/80'>
                   <p 
                    className='cursor-pointer text-gray-800 text-sm'
                    onClick={deleteThisPublicaion}
                    >Delete</p>
                 </div>
               : null}
            </header>
            <main className='relative grig grid-cols-1 h-[20rem]'>
                {doubleClick ? <HeartAnimation /> : null} 
                <img className='h-full w-full cursor-pointer' 
                src={url} 
                alt="image publication"
                onDoubleClick={startAnimationDoubleClick}
                />
            </main>
            <footer className='h-max pt-3 pb-7 px-3'>
                <figure className='w-6 h-8' onClick={incrementLikes}>
                  { like
                    ? <img className='opacity-[.8] cursor-pointer animate-fadein' src="/images/heart-red.svg" alt="image heart" /> 
                    : <img className='opacity-[.8] cursor-pointer' src="/images/heart-publication.svg" alt="image heart" />
                  }
                </figure>
                <div className='overflow-x-hidden'>
                  <p >
                  <span className='font-bold text-black/90 mr-1'>{author}</span> 
                  {legend}
                  </p>
                </div>
            </footer>
        </section>
    )
}