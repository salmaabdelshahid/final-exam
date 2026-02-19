"use client"
import { cartI } from "@/interface";
import { log } from "console";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { string } from "zod";

export const CartContext = createContext<{
    cartData : cartI | null,
    setCartData : (value : cartI | null)=> void,
    isLoading : boolean,
    setIsLoading : (value : boolean)=> void,
    getCart : ()=> void,
    userToken : string | null
}>({
    cartData : null,
    setCartData : ()=> {},
    isLoading : false,
    setIsLoading : ()=> {},
    getCart : ()=>{},
    userToken : null
})

export default function CartContextProvider({children, userToken}:{children : ReactNode, userToken:string}){
    const [cartData, setCartData] = useState<cartI | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const session = useSession()
    async function getCart(){
        
           try {
            
            setIsLoading(true);
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart",{
            headers : {
                token : userToken!
            }
        })
        const data:cartI = await response.json()
        setCartData(data);
        
        }
        catch(err){
            console.log(err);
            
        }
        finally{
            setIsLoading(false);
        }     
        
    }
    useEffect(()=>{
        getCart()
    },[])


    return <>
    <CartContext.Provider value={{cartData, setCartData, isLoading, setIsLoading, getCart,userToken}}>
    {children}
    </CartContext.Provider>
    </>
}