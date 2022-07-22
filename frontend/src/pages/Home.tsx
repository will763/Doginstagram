import axios from "axios";
import React, { useEffect, useState } from "react"
import useSWR from "swr";
import { Header } from "../components/Header"
import { NoPublicationHome } from "../components/NoPublicationHome";
import { PublicationHome } from "../components/PublicationHome";

export const Home = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const fetcher = (url:string) => axios.get(import.meta.env.VITE_API_URL + url, {headers: {'Authorization' : `${user}` }}).then(res => res.data);
  const { data, error } = useSWR('/publication', fetcher, {refreshInterval: 1000});

    return(
          <section className="min-w-full">
            <Header />
            <section className="h-max w-full pt-24 pb-24">
              <main className="flex flex-col items-center gap-y-6 w-full">
                {!data ? <NoPublicationHome />
                  : 
                  <>
                   { React.Children.toArray(
                      data.map((data:any)=> {
                       return <PublicationHome id={data?.id} likes={data?.likes} author={data?.username} legend={data?.legend}  url={data?.url} />
                      })
                   )}
                  </>
                }
              </main>
            </section>
          </section>
    ) 
}