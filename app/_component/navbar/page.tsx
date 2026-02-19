"use client"
import React, { useContext } from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { Loader, Loader2, LoaderIcon, ShoppingCartIcon, UserIcon } from 'lucide-react'
import { CartContext } from '../context/cartContext'
import { useSession, signOut  } from 'next-auth/react'

export default function Navbar() {
   const {cartData,isLoading}=useContext(CartContext);
   const session = useSession()
   
   
  return <>
  <nav className=' bg-gray-100 shadow p-4 sticky top-0'>
    <div className="container mx-auto flex justify-between items-center">
      <h1 className='text-2xl font-semibold'>
        <Link href={"/"}>ShopMart</Link>
      </h1>
      <NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Link href="/products">Products</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Link href="/brands">Brands</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Link href="/categories">Categories</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
<div className="flex">
  <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <UserIcon></UserIcon>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      {
        session.status=="authenticated"?
        <>
        
      <DropdownMenuItem onClick={()=>signOut({
        callbackUrl : "/login"
      })}>LogOut</DropdownMenuItem>
        </>: 
        <>
        <Link href={"/login"}><DropdownMenuItem>Login</DropdownMenuItem></Link>
      <Link href={"/register"}><DropdownMenuItem>Register</DropdownMenuItem></Link>
        </>
      }
      
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
  {
    session.status=="authenticated"&&<>
    <Link href={"/cart"} className='ml-1 relative'>
  <ShoppingCartIcon></ShoppingCartIcon>
  <Badge className='w-5 h-5 absolute -top-2 -right-3 flex justify-center items-center p-0'>
  {isLoading ? <Loader2 className='w-3 h-3 animate-spin text-current' />: cartData?.numOfCartItems}
</Badge>
  </Link>
    </>
  }
  
  
</div>
    </div>
    
  </nav>
  </>
}
