"use client"
import { Button } from '@/components/ui/button'
import React, { use, useContext, useEffect , useState } from 'react'
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"
import { CartContext } from '../context/cartContext'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { log } from 'console'

export default function AddToCart({productId, token}:{productId:string , token :string}) {

    const [loading, isLoading]=useState(false);
    const {cartData, setCartData}=useContext(CartContext);
    const session = useSession()
    const router = useRouter()
    async function addProduct(){
      
        if(session.status=="authenticated"){
            isLoading(true);
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart",{
            method : "POST",
            headers: {
    "Content-Type": "application/json",
    token : token
  },
  body : JSON.stringify({productId})
        })
        const data = await response.json()
        data.status=="success" && toast.success("Product added successfully to your cart", { position: "top-center" });
        setCartData(data);
        isLoading(false);
        }
        else{
          router.push("/login")
        }
    }

  return <>
  <Button onClick={addProduct} className='grow p-3 mr-2 rounded-xl' >Add To Cart 
      {loading==false?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>:<Spinner/>}
    </Button>
    
  </>
}
