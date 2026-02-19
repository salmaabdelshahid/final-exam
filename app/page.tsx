import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return <>
  <div className="flex flex-col justify-center items-center h-120 text-center m-7 md:m-20">
    <h1 className="md:text-5xl text-4xl xl:text-6xl font-semibold mb-10">Welcome to ShopMart</h1>
    <p className="text-gray-700 text-xl md:max-w-3xl mb-10">Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.</p>
    <div className="buttons">
      <Link href={"/products"}>
      <Button className="px-8 py-6 mx-4 my-2 hover:text-black border-2 border-black hover:bg-white">Shop Now</Button>
      </Link>
      <Link href={"/categories"}>
      <Button className="bg-white text-balck border-2 border-black py-6 px-8 hover:text-white hover:bg-black">Browse Categories</Button></Link>
    </div>
  </div>
  </>
}
