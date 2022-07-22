interface Props {
    url?: string
    likes?: number
}

export const ItemGallery = ({url,likes}: Props) => {
    return (
        <figure className="relative">
            <img className="h-[100%] big:h-[calc(100vw-65.8vw)]" src={url} alt="item gallery" />
              <div className="absolute opacity-0 hover:opacity-100 cursor-pointer top-0 left-0 grid place-items-center bg-black/40 w-full h-full">
                <div className="flex gap-2 items-end">
                  <img className=" h-6 w-6" src="/images/Like.svg" alt="icon likes" />
                  <span className="text-white font-roboto font-bold text-lg">{likes}</span>
                </div>
            </div>
        </figure>
    )
}
//h-[calc(100vw-78vw)] min-h-[10rem]