
export const NoPublication = () => {
    return (
        <section className="bg-white rounded-md h-max text-center border border-[#000000]/20 absolute left-[50%] w-64 -translate-x-[50%] ">
            <main className="flex flex-col items-center px-[5%] pt-2 pb-4">
                <figure>
                    <img className="w-28" src="/images/no-photo.png" alt="image for no publications" />
                </figure>
                <p className="text-gray-600 font-roboto font-medium">
                Your profile has no publications, 
                publish some content so that it is displayed here.
                </p>
            </main>
        </section>
    )
}