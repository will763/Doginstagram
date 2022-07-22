interface Props {
    size?: boolean
}
 
 export const Logo = ({size}: Props) => {
  
    return (
        <h1 
         className={size ? 'font-billabong tracking-wide text-black/90 text-[2.2rem]'
         : 'font-billabong tracking-wide text-black/90 text-[3.5rem]'
        }
        
        >Doginstagram</h1>
    )
 }