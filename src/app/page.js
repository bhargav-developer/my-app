import Image from "next/image";
import Header from "./Components/Header";
import Link from "next/link";


export default function Home() {
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
            <button className="bg-black py-3 px-6 rounded-sm text-white border-2 hover:text-black hover:bg-white hover:border-black  hover:duration-300 transition-all">
              <Link href={"/catalogue"}> Shop Now</Link>
            </button>

          </div>
        </div>
        <div className="basis-[50%] justify-center items-center flex">
          <img src="https://assets.api.uizard.io/api/cdn/stream/c8515796-8789-48b2-9884-dec4cd6778f4.jpg" alt="img" className="w-[300px] rounded-md h-[400px]" />

        </div>
      </div>


    </>
  );
}
