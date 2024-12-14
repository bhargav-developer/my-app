"use client"
import Image from "next/image";
import Header from "./Components/Header";
import Link from "next/link";
import useStore from "../helpers/store";
import { useEffect, useState } from "react";


export default function Home() {

  const { setCategory } = useStore();
  const productCategories = [{
    name: "Men",
    imageUrl: "http://localhost:3000/products/Men/1.png",
  }, {
    name: "Women",
    imageUrl: "http://localhost:3000/products/Women/1.png",
  }, {
    name: "Kids",
    imageUrl: "http://localhost:3000/products/Kids/3.png",
  }]

  return (
    <>
      <Header />
      <div className="flex px-16 m-5 mt-12">
        <div className="basis-[50%] flex  flex-col justify-center gap-8">
          <h1 className="text-5xl leading-snug font-semibold">
            Discover Your Style <br /> Your Fashion
          </h1>
          <p>
            Explore a wide range of fashion  handpicked to <br /> match your unique style
          </p>
          <div>

            <Link href={"/catalogue"} className="bg-black py-3 px-6 rounded-sm text-white border-transparent border-2 hover:text-black hover:bg-white hover:border-black  hover:duration-300 transition-all" > Shop Now</Link>


          </div>
        </div>
        <div className="basis-[50%] justify-center items-center flex">

          <img src="https://assets.api.uizard.io/api/cdn/stream/c8515796-8789-48b2-9884-dec4cd6778f4.jpg" alt="img" className="w-[300px] rounded-md h-[400px]" />


        </div>
      </div>

      <div className="px-16 m-5 mt-24">
        <div>
          <h1 className="text-center text-4xl">Categories</h1>
        </div>
        <div className="flex m-5 p-5 justify-between flex-wrap">
          {
            productCategories.map((category,index) => {
             return  <Link key={index} href={"/catalogue"} >
             <div onClick={() => setCategory(category.name)} className="rounded-sm transition-all duration-300 cursor-pointer hover:translate-y-3 p-2 hover:shadow-[0px_5px_15px_rgba(0,0,0,0.3)]">
                <img className=" rounded-md h-[300px]" src={category.imageUrl} alt="" />
                <h1 className="text-xl mt-3 ">{category.name}</h1>
              </div>
             </Link>
            })
          }
        </div>

      </div>

    

    </>
  );
}
