"use client"
import React, { useState } from 'react'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { useForm } from "react-hook-form"
import * as zod from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'




export default function Register() {
  const router = useRouter();
  const [isExist, setisExist] = useState(false)
  const schema = zod.object({
      name :      zod.string().min(3,"at least 3 letters").max(20,"at most 20 letters"),
      email :     zod.string().trim().email().lowercase(),
      password:   zod.string().min(8, "at least 8 letters")
                  .max(32, "at least 32 letters")
                  .regex(/[A-Z]/, "at least one capital letter")
                  .regex(/[a-z]/, "at least om small letter")
                  .regex(/[0-9]/, "at least one letter")
                  .refine((val) => !val.includes(" "), "no spaces"),
      rePassword : zod.string(),
      phone:       zod.string()
                  .min(11, "must be 11 number")
                  .max(11, "must be 11 number")
                  .regex(/^[0-9]+$/, "just numbers") 
  }).refine((data) => data.password === data.rePassword, {
  message: "not match",
  path: ["repassword"]
});



  const {register, handleSubmit, formState:{errors}}= useForm({
    defaultValues : {
      name : "",
      email : "",
      password : "",
      rePassword : "",
      phone : ""
    },
        resolver: zodResolver(schema), 
  })


  async function sendData(userData:{
    name : string,
      email : string,
      password : string,
      rePassword : string,
      phone : string
  }){
    console.log(userData);
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup",{
      method : "POST",
      body : JSON.stringify(userData),
      headers: {"content-type":"application/json"}
    })
    const data = await response.json();
    console.log(data);
    if (data.message === "success") {
      router.push("/login"); 
    }
    if(data.message==="Account Already Exists"){
      setisExist(true)
    }
  }
  return <>
  <form className="h-150 flex flex-col justify-center items-center" onSubmit={handleSubmit(sendData)}>
    <h2 className='text-3xl font-semibold my-5'>Register now and Join US</h2>
    {
      isExist&&(<p className='text-2xl font-semibold  text-red-600'>Account Aleady Exists</p>)
    }
  <FieldSet className="w-full max-w-xs border border-gray-300 shadow p-5 rounded-2xl">
      <FieldGroup>

        <Field>
          <FieldLabel htmlFor="username p-1">Name</FieldLabel>
          <Input {...register("name")} id="username" type="text" placeholder="your name"/>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.name.message}</p>
  )}
        </Field>
        
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input {...register("email")} id="email" type="email" placeholder='your email'/>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email.message}</p>
  )}
        </Field>
        
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input {...register("password")} id="password" type="password" placeholder='your password' />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}</p>
  )}
        </Field>

        <Field>
          <FieldLabel htmlFor="repassword">Confirm Password</FieldLabel>
          <Input {...register("rePassword")} id="repassword" type="password" />
          {errors.rePassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.rePassword.message}</p>
  )}
        </Field>

        <Field>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <Input {...register("phone")} id="phone" type="text" placeholder='your phone' />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">
              {errors.phone.message}</p>
  )}
        </Field>

      </FieldGroup>
      <Button type='submit'>submit</Button>
    </FieldSet>
  </form>
  </>
}
