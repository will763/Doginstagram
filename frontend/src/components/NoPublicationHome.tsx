
export const NoPublicationHome = () => {
    return (
        <section>
            <main className="h-max w-[calc(100%-10%)] mt-16 mx-auto bg-white rounded-md text-center flex flex-col items-center px-[20%] pt-3 pb-12 border border-[#000000]/20">
                <figure>
                    <img src="/images/no-photo.png" alt="image for no publications" />
                </figure>
                <p className="text-gray-700">
                 There are no posts yet, please post something to have it displayed here.
                </p>
            </main>
        </section>
    )
}