import axios from 'axios';
import { useEffect, useState } from 'react'
import useSWR, { useSWRConfig } from 'swr';
import { AlterImageProfile } from '../components/AlterImageProfile';
import { MobileNumberOrEmail } from '../components/error/MobileNumberOrEmail';
import { UsernameRegister } from '../components/error/UsernameRegister';
import { Header } from '../components/Header';
import { LoaderLogin } from '../components/LoaderLogin';
import { getInformationsProfile, updateAccount } from '../services/services';
import { Loading } from './Loading';
import defaultPerfil from '/images/user.png'
declare let ml5: any;

export const AccountsEdit = () => {

  const [isChangingImage, setIsChangingImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpadting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorUsername, setErrorUsername] = useState('');
  const [errorMobileNumberOrEmail, setErrorMobileNumberOrEmail] = useState('');
  const [user, setUser] = useState<string | null>(localStorage.getItem('user'));

  const fetcher = (url:string) => axios.get(import.meta.env.VITE_API_URL + url, {headers: {'Authorization' : `${user}` }}).then(res => res.data);
  const { data, error } = useSWR('/users/profile', fetcher, {refreshInterval:50});

  const cancelAlterImage = () => {
    setIsChangingImage(false);
  }

  const [initialUrl, setInitialUrl] = useState('');

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [biography, setBiography] = useState('');
  const [emailPhone, setEmailPhone] = useState('');

  useEffect(() => {
    const idInterval = setTimeout(() => {
      setIsLoading(false);
    }, 1700);

    return () => clearTimeout(idInterval);
  }, [])

  useEffect(() => {
    if (name && username && biography && emailPhone) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [name, username, biography, emailPhone])

  const loadImgProfile = (url:string) => {
    setInitialUrl(url)
  }

  const restart = () => {
    setName('');
    setUsername('');
    setBiography('');
    setEmailPhone('');
  }


  const handleButtonSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsUpadting(true);
    setTimeout(() => {
      setIsUpadting(false);
      updateAccount({ name, username, biography, emailPhone, user })
        .then(res => {
          if (res.status === 200) {
            restart();
          } else if (res.status === 400) {
            if (res.data === 'Username already exists.') {
              setErrorUsername(res.data)
            } else if (res.data === 'Mobile number or email are already being used.') {
              setErrorMobileNumberOrEmail(res.data)
            }
          }
        });
    }, 1500);
  }

  return (
    <section>
      {isLoading ? <Loading />
        :
        <>
          <Header urlProfile={loadImgProfile}/>
          {isChangingImage ? <AlterImageProfile cancelAlterImage={cancelAlterImage} />
            : null}
          <main className='bg-[#FAFAFA] xs:bg-white h-screen flex justify-center py-32 xs:py-20 overflow-y-scroll font-roboto'>
            <section className='flex justify-center w-max h-max bg-white xs:border-none rounded-[.2rem] border border-black/20'>
              <form className='pt-[2rem] pb-[3rem]'>
                <div className='flex flex-col pl-[20%] lbig:pl-[2rem] '>

                  <div className='flex items-center gap-8 lbig:gap-4 cursor-pointer'>
                    <label className='w-max h-max xs:flex-none'>
                      <img className='rounded-full cursor-pointer xs:flex-none h-11 w-11' src={initialUrl ? initialUrl : defaultPerfil} alt="image of profile" onClick={() => setIsChangingImage(true)} />
                    </label>
                    <div className='flex flex-col'>
                      <span className='text-xl xs:w-[calc(45vw-.1vw)] xs:truncate '>{data?.name}</span>
                      <span className='text-[#0095f6] text-sm font-semibold cursor-pointer' onClick={() => setIsChangingImage(true)}>Change profile picture</span>
                    </div>
                  </div>

                  <div className='flex lbig:flex-col lbig:gap-1 gap-8 w-[60%] xs:w-full lbig:mt-6 mt-10'>
                    <label htmlFor="name" className='font-bold mt-[.4rem] text-black/90' >Name</label>
                    <div >
                      <input type="text" name="name" className=' xs:w-[90%] w-[22rem] border border-black/10 rounded-[0.200rem] h-9 px-2 placeholder:text-black/60' placeholder='Name' autoComplete='off' onChange={(e) => setName(e.target.value)} value={name} />
                      <p className='mt-4 xs:w-[85%] text-[.85rem] leading-[1rem] text-black/60'>Help people discover your account using the name you are known by: your full name, nickname or business name.</p>
                    </div>
                  </div>

                  <div className='flex lbig:flex-col lbig:gap-1 w-[60%] xs:w-full gap-8 mt-10'>
                    <label htmlFor="username" className='font-bold mt-[.4rem] whitespace-nowrap text-black/90 -ml-9 lbig:-ml-0' >User name</label>
                    <div>
                      <input type="text" name="username" className='xs:w-[90%] w-[22rem] border border-black/10 rounded-[0.200rem] h-9 px-2 placeholder:text-black/60' placeholder={data?.username} autoComplete='off' onChange={(e) => { setUsername(e.target.value); setErrorUsername('') }} value={username} />
                      {errorUsername ? <UsernameRegister /> : null}
                      <p className='mt-4 xs:w-[85%]  text-[.85rem] leading-[1rem] text-black/60'>Help people discover your account using the name you are known by: your full name, nickname or business name.</p>
                    </div>
                  </div>

                  <div className='flex lbig:flex-col lbig:gap-1 gap-8 w-[60%] xs:w-full mt-10'>
                    <label htmlFor="Biography" className='font-bold mt-[.5rem] -ml-9 lbig:-ml-0 text-black/90' >Biography</label>
                    <div className='w-full'>
                      <textarea name="Biography" className='xs:w-[90%] w-[22rem] border border-black/10 rounded-[0.200rem] pt-1 pb-3 h-20 px-2 placeholder:text-black/60' placeholder={data?.biography} onChange={(e) => setBiography(e.target.value)} value={biography} />
                    </div>
                  </div>

                  <div className='flex lbig:flex-col lbig:gap-1 mt-8 w-[60%] xs:w-full gap-8'>
                    <label htmlFor="phoneoremail" className='font-bold -ml-24 lbig:-ml-0 mt-[.5rem] whitespace-nowrap text-black/90' >Email or telephone</label>
                    <div className='w-full'>
                      <input type="text" name="phoneoremail" className='xs:w-[90%] w-[22rem] border border-black/10 rounded-[0.200rem] h-9 px-2 placeholder:text-black/60' placeholder={data?.emailPhone} autoComplete='off' onChange={(e) => { setEmailPhone(e.target.value); setErrorMobileNumberOrEmail(''); }} value={emailPhone} />
                      {errorMobileNumberOrEmail ? <MobileNumberOrEmail /> : null}
                    </div>
                  </div>
                  <button
                    className='self-start h-8 w-32 lbig:-ml-0 ml-[4.5rem] mt-11 rounded-sm 
                font-extrabold disabled:opacity-60 font-roboto px-8 py-1 text-white bg-[#0095f6]'
                    disabled={isDisabled}
                    onClick={handleButtonSend}
                  >{isUpdating ? <LoaderLogin /> : 'Send'}</button>
                </div>
              </form>
            </section>
          </main>
        </>
      }
    </section>
  )
}
