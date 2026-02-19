import { productI } from '@/interface';
import { Params } from 'next/dist/server/request/params'
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
import Carousal from '@/app/_component/carousal/carousal';
import AddToCart from '@/app/_component/addToCart/AddToCart';
import { getToken } from '@/app/Helpers/getUserToken';
export const dynamic = 'force-dynamic';

export default async function ProductDetails({params}:{params: Params}) {
    const {productId}= await params
              const token = await getToken()
    
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/products/"+productId)
    const {data}:{data:productI} = await response.json()
    
  return <>
  <Card className=' grid gap-2 md:grid-cols-10 w-3/4 xl:w-3/5 mx-auto p-3 my-10 md:my-40 '>
    <div className='w-full object-contain bg-center h-fit md:col-span-4'>
      <Carousal images={data.images} altContent={data.description}/>
    </div>
  <div className=' md:col-span-6 flex flex-col justify-center'>
    <CardHeader>
    <CardDescription>{data.brand.name}</CardDescription>
    <CardTitle>{data.title}</CardTitle>
    <p>{data.description}</p>
  </CardHeader>
  <CardContent>
    <CardDescription>{data.category.name}</CardDescription>
    <div className="flex">
      <MyStarIcon/>
    <MyStarIcon/>
    <MyStarIcon/>
    <MyStarIcon/>
    <MyStarIcon/>
    <span className='ml-3 text-gray-600'>({data.ratingsQuantity})</span>
    </div>
    <span className='font-semibold'>EGP {data.price}.00</span>
  </CardContent>
  <CardFooter>
    <AddToCart productId={data._id}  token={token!}/>
    <HeartIcon></HeartIcon>
  </CardFooter>
  </div>
</Card>
  </>
}
