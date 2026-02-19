"use client"
import { Button } from '@/components/ui/button'
import React, { useContext, useState } from 'react'
import { CartContext } from '../context/cartContext'
import { cartI } from '@/interface'
import { Loader } from 'lucide-react'

export default function DeleteIem({itemId,userToken}:{itemId : string , userToken:string}) {
    const [loading, setloading] = useState(false);
    const {setCartData}=useContext(CartContext)
    async function DeleteItem(){
        setloading(true);
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart/"+itemId,{
            method : "DELETE",
            headers : {
                token: userToken!
            }
        })
        const newCart = await response.json();
        setCartData(newCart);
        setloading(false)

    }
  return <>
  <Button onClick={DeleteItem} className='text-red-600 bg-transparent hover:bg-transparent hover:underline text-sm p-0'>
    {loading?<Loader className='animate-spin'></Loader>:"Remove"}
  </Button>
  
  </>
}
