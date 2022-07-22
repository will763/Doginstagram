import { ChangeEvent, useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Password } from "../components/error/Password";
import { UsernameLogin } from "../components/error/UsernameLogin";
import { LoaderLogin } from "../components/LoaderLogin"
import { Logo } from "../components/Logo"
import { login } from "../services/services";
import { Styled } from "../utils/styles/Login";
import { Loading } from "./Loading";

export const Login = () => {
    const navigate = useNavigate();

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [isEmpty, setIsEmpty] = useState(true);
    const [show, setShow] = useState(false);
    const [verifyAccount, setVerifyAccount] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const verifyIsFilled = () => {
        username !== '' &&  password !== '' 
        ? setIsEmpty(false)
        : setIsEmpty(true);
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === 'username') {
           setUsername(e.target.value);
           setErrorUsername('');
        } else {
            setPassword(e.target.value);
            setErrorPassword('');
        }
    }

    const handleShowPassword = () => {
        setShow(!show);
    }

    const handleSubmitButton = () => {
       setVerifyAccount(true);
       setTimeout(()=>{
         setVerifyAccount(false);
         login({username, password}).then(res => {
    
          if (res.status === 200) {
            localStorage.setItem('user', res.data);
            navigate('/', {replace: true});
          }else if (res.status === 400) {
             if (res.data === 'Username not found.') {
                setErrorUsername(res.data)
             } else if (res.data === 'Invalid password.') {
                       setErrorPassword(res.data)
             }
          }
         });
       }, 1500);
        
    }

    useEffect(()=> {
      verifyIsFilled();
    }, [username, password])

    useEffect(()=>{
      const idInterval = setTimeout(()=> {
        setIsLoading(false);
      }, 1700);

      return () => clearTimeout(idInterval);
    }, [])

    return (
        <main className="min-h-screen h-screen min-w-full font-roboto bg-[#FAFAFA]">
            <div className='h-full flex flex-col justify-center items-center'>
             { isLoading ? <Loading />
                : 
                <>
                 <section className="bg-white xs:bg-[#FAFAFA] py-10 xs:border-none border border-black/10 w-[25rem] xs:w-[90%] xs:min-w-[20rem] text-center" >
                  <div className="py-6">
                   <Logo />
                  </div>
                 <main className="w-[90%] mx-[auto] flex flex-col items-center">
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
                    { errorUsername ? <UsernameLogin /> : null}
                  </div>
                  <div className="relative h-max  w-[80%]">
                   <div className="relative h-11 mb-2 w-[100%]">
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
                   { errorPassword ? <Password /> : null}
                  </div>
                  <div className="w-full mt-2">
                    <button
                     onClick={handleSubmitButton}
                     disabled={isEmpty}
                     className={isEmpty ? Styled.disableButton : Styled.button}
                      >{verifyAccount ?  <LoaderLogin /> : "Login"}</button>
                  </div>
                 </main>
                </section>
                <section>
                   <main className="py-6 mt-2 bg-white xs:bg-[#FAFAFA] xs:border-none border border-black/10 xs:w-[100%] xs:min-w-[90%] w-[25rem] flex justify-center items-center gap-2">
                    <p>Don't have an account?</p>
                      <Link to="/signup" className="text-[#0095f6]" >
                        Sign up
                      </Link>
                   </main>
                 </section>
              </>
             }
            </div>
        </main>
    )
}