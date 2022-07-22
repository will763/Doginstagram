import { ChangeEvent, Suspense, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { LoaderLogin } from "../components/LoaderLogin";
import { Logo } from "../components/Logo"
import { register } from "../services/services";
import { Styled } from "../utils/styles/Login";
import { Loading } from "./Loading";
import { useNavigate } from "react-router-dom";
import { MobileNumberOrEmail } from "../components/error/MobileNumberOrEmail";
import { UsernameRegister } from "../components/error/UsernameRegister";

  export const SignUp = () => {
    const navigate = useNavigate();

    const [numberOrEmail,setNumberOrEmail] = useState('');
    const [fullname,setFullname] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [isEmpty, setIsEmpty] = useState(true);
    const [show, setShow] = useState(false);
    const [verifyAccount, setVerifyAccount] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [errorUsername, setErrorUsername] = useState('');
    const [errorMobileNumberOrEmail, setErrorMobileNumberOrEmail] = useState('');

     const verifyIsFilled = () => {
        if(username && password && fullname && numberOrEmail) {
            setIsEmpty(false);
         } else {
            setIsEmpty(true);
          }
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.id === 'numberOrEmail') {
          setNumberOrEmail(e.target.value);
          setErrorMobileNumberOrEmail('');
        }
        if(e.target.id === 'username') {
          setUsername(e.target.value);
          setErrorUsername('')
        }
        if(e.target.id === 'fullname') setFullname(e.target.value);
        if(e.target.id === 'password') setPassword(e.target.value);
    }

    const handleShowPassword = () => {
        setShow(!show);
    }

    const handleSubmitButton = () => {
       setVerifyAccount(true);
       setTimeout(() => {
         setVerifyAccount(false);
         register({username,fullname, password, numberOrEmail})
          .then(res => {
            if (res === 201){
              navigate('/login', {replace: true});
            }else {
              if (res.response.data === 'Username already exists.'){
                  setErrorUsername(res.response.data)
              } else if (res.response.data === 'Mobile number or email are already being used.') {
                         setErrorMobileNumberOrEmail(res.response.data);
              }
            }
          }) 
       }, 1500);         
    }

    useEffect(()=> {
      verifyIsFilled();
    }, [username, password, fullname, numberOrEmail]);

    useEffect(()=>{
      const idInterval = setTimeout(()=> {
        setIsLoading(false);
      }, 1700);

      return () => clearTimeout(idInterval);
    }, [])

    return (
            <main className="min-h-screen h-screen bg-[#FAFAFA] min-w-full font-roboto">
             <div className="h-full grid place-items-center">
             { isLoading ? <Loading />
                :
               <div className="mt-4">
                  <section className="bg-white xs:bg-[#FAFAFA] pt-10 xs:border-none border border-black/10 w-[25rem] xs:w-[90%] xs:min-w-[20rem] text-center" >
                    <div>
                     <Logo />
                    </div>
                  <p className="font-bold text-lg text-gray-500 pb-6 w-[60%] mx-auto">
                   Sign up to see photos and videos of your friends.
                  </p>
                  <main className="w-[90%] mx-[auto] flex flex-col items-center">
                   <div className="relative h-max w-[80%]">
                    <div className="relative h-11 mb-2 w-[100%]">
                     <input 
                      id="numberOrEmail"
                      type="text" 
                      autoComplete="off"
                      value={numberOrEmail}
                      onChange={handleChange}
                      className={numberOrEmail !== '' ? Styled.inputActive : Styled.input}
                     />
                     <span className={numberOrEmail !== '' ? Styled.spanActive : Styled.span}
                      >Mobile Number or Email</span>
                     </div>
                      { errorMobileNumberOrEmail ? <MobileNumberOrEmail /> : null}
                     </div>
                   <div className="relative h-11 mb-2 w-[80%]">
                     <input 
                      id="fullname"
                      type="text" 
                      autoComplete="off"
                      value={fullname}
                      onChange={handleChange}
                      className={fullname !== '' ? Styled.inputActive : Styled.input}
                     />
                     <span className={fullname !== '' ? Styled.spanActive : Styled.span}
                      >Full Name</span>
                    </div>
                    <div className="relative h-max w-[80%]">
                     <div className="relative h-11 mb-2 w-[100%]">
                    <input 
                     id="username"
                     type="text" 
                     autoComplete="off"
                     value={username}
                     onChange={handleChange}
                     className={username !== '' ? Styled.inputActive : Styled.input}
                    />
                    <span className={username !== '' ? Styled.spanActive : Styled.span}
                    >Username</span>
                    </div>
                     { errorUsername ? <UsernameRegister /> : null}
                   </div>
                  <div className="relative h-11 mb-4  w-[80%]">
                   <input
                    id="password"
                    autoComplete="off"
                    type={show ? 'text' : 'password'} 
                    value={password} 
                    onChange={handleChange}
                    className={password !== '' ? Styled.inputPasswordActive : Styled.inputPassword} />
                   <span className={password !== '' ? Styled.spanActive : Styled.span}
                    >Password</span>
                   <span className="absolute right-4 font-sans cursor-pointer top-2/4 -translate-y-2/4 font-bold text-black/75" onClick={handleShowPassword}>{show ? 'hide' : 'show'}</span>
                  </div>
                   <button
                    onClick={handleSubmitButton}
                    disabled={isEmpty}
                    className={isEmpty ? Styled.disableButton : Styled.button}
                   >{verifyAccount ?  <LoaderLogin /> : "Sign Up"}</button>
                  </main>
                 </section>
                <section className="mt-2 mb-4">
                 <main className="py-6 bg-white xs:bg-[#FAFAFA] xs:border-none border border-black/10 xs:w-[100%] xs:min-w-[90%] w-[25rem] flex justify-center items-center gap-2">
                    <p>Have an account?</p>
                      <Link to="/login" className="text-[#0095f6]" >
                        Login
                      </Link>
                 </main>
               </section>
              </div>
              }
             </div>
            </main>
    )
}