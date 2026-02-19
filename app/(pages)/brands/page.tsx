import { BrandI } from '@/interface';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

export default async function Brands() {
  
  
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands")
    const {data : brands} : {data : BrandI[]} = await response.json()
    
    
  
  return <>
  <h1 className='text-3xl font-semibold m-5'>Brands</h1>
  <div className='m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-2'>
    {brands.map((brand)=>
    <Link key={brand._id} href={"/brands/"+brand._id}>
    <div  className="border w-fit mx-auto p-5 border-gray-300 shadow rounded-3xl text-center overflow-hidden hover:shadow-2xl duration-200">
    <Image
      src={brand.image}
      alt="Picture of the author"
      width={300}
      height={300}
      className='object-contain w-auto h-50'
      loading="eager"
    />
    <span className='font-bold text-xl'>{brand.name}</span>
  </div>
    </Link>)}
  </div>
  </>
}
