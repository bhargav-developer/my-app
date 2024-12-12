"use client"
import Image from "next/image";
import Header from "./Components/Header";
import Link from "next/link";
import useStore from "../helpers/store";
import { useEffect } from "react";
import axios from "axios";


export default function Home() {

  const { setCategory  } = useStore();
  
  return (
    <>
      <Header />
      <div className="flex px-16 m-5 mt-12">
        <div className="basis-[50%] flex  flex-col justify-center gap-8">
          <h1 className="text-4xl leading-snug font-semibold">
            Discover Your Style <br /> Your Fashion
          </h1>
          <p>
            Explore a wide range of fashion  handpicked to <br /> match your unique style
          </p>
          <div>
          
              <Link href={"/catalogue"} onClick={() => setCategory("Men")} className="bg-black py-3 px-6 rounded-sm text-white border-transparent border-2 hover:text-black hover:bg-white hover:border-black  hover:duration-300 transition-all" > Shop Now</Link>
      

          </div>
        </div>
        <div className="basis-[50%] justify-center items-center flex">
          <img src="https://assets.api.uizard.io/api/cdn/stream/c8515796-8789-48b2-9884-dec4cd6778f4.jpg" alt="img" className="w-[300px] rounded-md h-[400px]" />

        </div>
      </div>


    </>
  );
}
