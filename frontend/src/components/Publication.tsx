export const Publication = () => {
   return (
       <div className="flex justify-center h-14 w-[20rem]">
         <picture className="flex gap-2 items-center lbig:border-t-0 border-t border-black">
            <source media="(max-width:735px)" srcSet="/images/grid_blue.png"></source>
            <img className="h-3 w-3 lbig:h-6 lbig:w-6" src="/images/grid.png" alt="icon gallery" />
            <p className="uppercase lbig:hidden font-medium text-sm text-black/90 tracking-wider">publications</p>
         </picture>
       </div>
   )
}