"use client"
import ClearCart from '@/app/_component/clearCart/ClearCart'
import { CartContext } from '@/app/_component/context/cartContext'
import DeleteIem from '@/app/_component/deleteItem/DeleteIem'
import { Payment } from '@/app/_component/payment/Payment'
import UpdateItemQuantity from '@/app/_component/updateItemQuantity/UpdateItemQuantity'
import { Button } from '@/components/ui/button'
import { LoaderIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
export default function Cart() {
  const {isLoading, cartData, getCart, userToken}=useContext(CartContext);
  if (!cartData || typeof cartData?.data?.products?.[0]?.product === "string") {
    getCart();
  }
    
  return <>
  <h2 className='text-3xl font-semibold mt-8 mb-2'>Shopping Cart</h2>
  {
    isLoading || typeof cartData?.data?.products[0]?.product=="string" ? <>
  <div className="h-screen  flex flex-col justify-center items-center">
    <h1 className='text-3xl font-bold'>ShopMart</h1>
    <span className="loader my-10"></span>
  </div>
  </>: cartData?.numOfCartItems!>0 ? <>
  <p className='text-gray-500 mb-5'>{cartData?.numOfCartItems} items in your cart</p>


  <div className="grid grid-cols-12 gap-5 items-start">

    <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
     
      {cartData?.data.products.map((item)=><div key={item._id} className="border border-gray-300 rounded-2xl grid grid-cols-12 overflow-hidden shadow p-1">
        
          <Image src={item.product.imageCover}
           alt="" 
           width={150}
            height={150}
             className='w-full h-35  object-contain col-span-2' />
        
        <div className="col-span-8 p-2 ml-2">
          <h3 className='text-xl font-semibold'>{item.product.title}</h3>
          <p className='text-gray-500 text-sm'>{item.product.brand.name} · {item.product.category.name}</p>
          <UpdateItemQuantity countItem={item.count} itemId = {item.product._id}></UpdateItemQuantity>
        </div>
        <div dir="rtl" className="col-span-2 flex flex-col p-3 justify-between items-start">
          <div>
            <h3 className='font-semibold'>EGP {item.price}.00</h3>
            <p className='text-gray-500 text-xs'>each</p>
          </div>
          <DeleteIem itemId = {item.product._id} userToken={userToken!}></DeleteIem>
        </div>
      </div>)}
      

    </div>

    <div className="col-span-12 lg:col-span-4 self-start">
      <div className="border border-gray-300 rounded-2xl shadow p-5 bg-white">
        <h3 className='text-xl font-semibold mb-6'>Order Summary</h3>

        <div className="flex justify-between mb-3">
          <span className="text-gray-500 text-sm">Subtotal ({cartData?.numOfCartItems} items)</span>
          <span className="font-semibold text-sm">EGP {cartData?.data.totalCartPrice}.00</span>
        </div>

        <div className="flex justify-between mb-6 border-b pb-4">
          <span className="text-gray-500 text-sm">Shipping</span>
          <span className="text-green-600 font-semibold text-sm">Free</span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-bold">Total</span>
          <span className="text-lg font-bold">{cartData?.data.totalCartPrice}</span>
        </div>

        <Link href={"/products"}>
        <Button className="w-full mb-3 bg-white border border-gray-300 text-black py-2 rounded-xl hover:bg-gray-50">
          Continue Shopping
        </Button>
        </Link>
        <Payment cartId={cartData?.cartId!} userToken={userToken!}></Payment>
      </div>

      <div className="flex justify-end mt-3">
         <ClearCart userToken={userToken!}></ClearCart>
      </div>
    </div>

  </div>
  </> :<div className="flex flex-col items-center justify-center h-200">
    <p className='text-2xl font-semibold mb-2'>Your Cart Is Empty</p>
    <Link href={"/products"}><Button>Add ones</Button></Link>
  </div>
  }
</>
}






