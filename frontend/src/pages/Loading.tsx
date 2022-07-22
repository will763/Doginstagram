import instagram from '/images/instagram.svg'
import meta from '/images/meta.png'

export const Loading = () => {
    return (
        <section className="min-h-screen min-w-full flex justify-center">
            <main>
                <div>
                  <figure className='flex justify-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 '>
                    <img className='h-16 w-16' src={instagram} alt="icon instagram" />
                  </figure>
                  <div className='flex flex-col items-center text-gray-500 font-semibold absolute top-[85%] left-1/2 -translate-x-1/2'>
                    <p>from</p>
                    <figure className='flex gap-2 items-center font-bold text-black'>
                      <img className='h-8 w-8' src={meta} alt="icon meta" />
                    <span>Meta</span>
                    </figure>
                  </div>  
                </div>           
            </main>
        </section>
    )
}