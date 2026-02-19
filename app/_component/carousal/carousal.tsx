"use client"
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'
export default function Carousal({images, altContent}:{images:string[], altContent:string}) {
  return <>
  <Carousel
      opts={{
    align: "start",
    loop: true,
  }}
   plugins={[
        Autoplay({
          delay: 1200,
        }),
      ]}>
  <CarouselContent>
    {images.map((image, index)=><CarouselItem key={index}>
    <Image
      src={image}
      alt={altContent}
      width={500}
      height={500}
      priority
      className='w-full object-contain bg-center h-fit md:col-span-4'
    />
    </CarouselItem>)}
  </CarouselContent>
</Carousel>
  </>
}
