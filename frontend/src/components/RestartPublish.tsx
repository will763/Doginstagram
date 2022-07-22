import { useEffect, useState } from "react"
import { addPublication } from "../services/services"

interface Props {
    restart: () => void
    match: boolean
    file: File | undefined
    legend: string
}


export const RestartPublish = ({restart, match, file, legend}: Props) => {
    const [user, setUser] = useState(localStorage.getItem('user'));

    const sendRequest = () => {
      let formData = new FormData();
      formData.append('file', file as Blob);
      formData.append('legend', legend)
      addPublication({formData ,user});
      restart();
    }

    return (
        <div className="h-full px-4 flex justify-between items-center">
            <button onClick={restart}>
                <img  src="/images/left-arrow.png" alt="return to inicial publish" />
            </button>
            <h1 className="font-bold tracking-wide text-black/90">Return</h1>
            { match
              ? 
               <h1 
                className="text-[#0095f6] font-semibold cursor-pointer"
                onClick={sendRequest}
               >publish</h1> 
              : 
               <h1
                className="h-2 invisible pointer-events-none"
               >publish</h1>}    
        </div>
    )
}