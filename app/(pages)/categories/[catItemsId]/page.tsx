import AddToCart from '@/app/_component/addToCart/AddToCart';
import MyStarIcon from '@/app/_component/star-icon/page';
import { getToken } from '@/app/Helpers/getUserToken';
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { productI } from '@/interface';
import { Link, HeartIcon } from 'lucide-react';
import { Params } from 'next/dist/server/request/params'
import Image from 'next/image';
import React from 'react'

export default async function CatItems({params}:{params:Params}) {
    const {catItemsId} = await params; 
    console.log(catItemsId);
    const token = await getToken()
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${catItemsId}`)
    const {data:products}:{data:productI[]} = await response.json()
    console.log(products);
    
  return <>
  {products.length===0? <>
  <div className="flex justify-center items-center h-150">

  <h1 className='text-3xl font-semibold m-5'>There Are no Items Now</h1>
  </div>
  
  </> :
  <>
  <h1 className='text-3xl font-semibold m-5'>{products[0].brand.name}</h1>
  <div className='m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-4'>
    {products.map((product)=>
<Card key={product._id}>
     <Image
      src={product.imageCover}
      alt=""
      width={300}
      height={300}
      priority
      className=' w-full h-75 mb-1 object-contain'
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
     
  <CardFooter>
    <AddToCart productId={product._id} token={token!}/>
    <HeartIcon></HeartIcon>
  </CardFooter>
</Card>
)}
  </div>
  </>}
  
  </>
}
