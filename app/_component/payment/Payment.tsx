"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContext, useRef } from "react"
import { CartContext } from "../context/cartContext"

export function Payment({cartId,userToken}:{cartId:string, userToken:string}) {
    const {cartData}=useContext(CartContext)
    let cityInput = useRef <HTMLInputElement | null>(null)
    let detailsInput = useRef<HTMLInputElement | null>(null)
    let phoneInput = useRef<HTMLInputElement | null>(null)
    const shippingAddress = {
        details: detailsInput.current?.value,
        phone: phoneInput.current?.value,
        city: cityInput.current?.value
    }
    async function checkOut() {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
            {
                method : "POST",
                headers: {
    "Content-Type": "application/json",
    token : userToken!
  },
  body : JSON.stringify({shippingAddress}),
            })
            const data = await response.json()
            if(data.status==="success"){
                window.open(data.session.url ,'_self')
            }
            
            
    }
    
    

    
  return <>
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button  className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 hover:text-white" variant="outline">Proceed to Checkout</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="city">City</Label>
              <Input ref={cityInput} id="city" />
            </Field>
            <Field>
              <Label htmlFor="details">Details</Label>
              <Input ref={detailsInput} id="details" />
            </Field>
            <Field>
              <Label htmlFor="phone">Phone</Label>
              <Input ref={phoneInput} id="phone" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={()=>checkOut()} type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  </>
}
