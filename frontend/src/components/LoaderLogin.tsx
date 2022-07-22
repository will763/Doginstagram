import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export const LoaderLogin = () => {
    return (
        <div className="flex justify-center items-center">
          <ClipLoader color="#ffffff" size={20} />
        </div>
    )   
}