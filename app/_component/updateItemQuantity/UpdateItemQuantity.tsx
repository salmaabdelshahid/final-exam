"use client"
import { Button } from '@/components/ui/button'
import React, { useContext, useState } from 'react'
import { CartContext } from '../context/cartContext';

export default function UpdateItemQuantity({countItem,itemId }:{countItem: number, itemId:string}) {
    
    
  return <>
  <div className="flex items-center mt-3">
              <Button   className='bg-white text-black border border-gray-300 w-8 h-8 hover:text-white'>-</Button>
              <span className="mx-3">{countItem}</span>
              <Button className='bg-white text-black border border-gray-300 w-8 h-8 hover:text-white'>+</Button>
            </div>
  </>
}









