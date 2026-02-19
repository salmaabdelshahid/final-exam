import { CategoryI } from '@/interface';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function Categories() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories")
      const {data : categories} : {data : CategoryI[]} = await response.json()
      
  return <>
  <h1 className='text-3xl font-semibold m-5'>Categories</h1>
  <div className='m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-2'>
    {categories.map((cat)=>
    <Link key={cat._id} href={"/categories/"+cat._id}>
    <div  className="border w-fit mx-auto p-5 border-gray-300 shadow rounded-3xl text-center overflow-hidden hover:shadow-2xl duration-200">
    <Image
      src={cat.image}
      alt="Picture of the author"
      width={300}
      height={300}
      className='object-contain h-50'
      loading="eager"
    />
    <span className='font-bold text-xl'>{cat.name}</span>
  </div>
    </Link>)}
  </div>
  </>
  
}
