import { productI } from '@/interface';
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import MyStarIcon from '@/app/_component/star-icon/page';
import { Button } from '@/components/ui/button';
import { HeartIcon } from 'lucide-react';
import Link from 'next/link';
import AddToCart from '@/app/_component/addToCart/AddToCart';
import { getToken } from '@/app/Helpers/getUserToken';
import { log } from 'console';
export const dynamic = 'force-dynamic';
export default async function Products() {
          const token = await getToken()
  const response =  await fetch("https://ecommerce.routemisr.com/api/v1/products")
  let {data:products}:{data:productI[]} = await response.json()
  
  
  
  return <>
  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-5">
{products.map((product)=>
<Card key={product._id} className='mx-auto m-3 sm:mx-0 p-4  '>
     <Link href={"/products/"+ product._id}>
     <Image
     
      src={product.imageCover}
      alt=""
      width={300}
      height={300}
      priority
      className=' mx-auto h-75 mb-1 object-contain'
    />
  <CardHeader>
    <CardDescription>{product.brand.name}</CardDescription>
    <CardTitle>{product.title.split(" ",3).join(" ")}</CardTitle>
    <CardDescription>{product.category.name}</CardDescription>
  </CardHeader>
 <CardContent>
  <div className="flex">
    <MyStarIcon/>
  <MyStarIcon/>
  <MyStarIcon/>
  <MyStarIcon/>
  <MyStarIcon/>
  <span className='ml-1'>({product.ratingsQuantity})</span>
  </div>
  <div className='font-semibold pl-1'>EGP {product.price}.00</div>
  </CardContent>
     </Link>
  <CardFooter>
    <AddToCart token={token!} productId={product._id}/>
    <HeartIcon></HeartIcon>
  </CardFooter>
</Card>
)}
  </div>
  </>
}
