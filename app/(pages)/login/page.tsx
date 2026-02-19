"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardFooter,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
 import {signIn} from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { Loader } from "lucide-react"
import Link from "next/link"
type FormField = z.infer<typeof formSchema>




const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required")
})

export default function loginForm() {
  let searshParams = useSearchParams()
  const [isLoading, setIsLoading] = React.useState(false)
  console.log(searshParams.get("error"));
  
  const form = useForm<FormField>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email : "",
      password: "",
    }
  })

  async function onSubmit(data: FormField) {
    setIsLoading(true)
    const response = await signIn("credentials",{
      email : data.email,
      password : data.password,
      callbackUrl: "/",
      redirect: true
    }) 
    setIsLoading(false)
    console.log(response);
    
  }

  return <>
    <div className="h-100  flex flex-col justify-center items-center ">
      <h2 className="text-3xl font-semibold mb-5">Welcome Back!</h2>
      
    <Card className=" w-100 sm:w-120 p-5 mx-auto">
        {searshParams.get("error")&& (<p className="font-semibold text-red-600 my-1">{searshParams.get("error")}</p>)}
        <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="your email"
                    
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="your password"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <CardFooter className="my-2 flex flex-col">
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form">
            {isLoading?<Loader className="animate-spin"></Loader>: "submit"}
          </Button>
        </Field>
        <p className="text-sm mt-2" >Didn't have an account? <Link className="text-blue-600 hover:underline" href={"/register"}>Click here to create your own account</Link></p>
      </CardFooter>
    </Card>
    </div>
  </>
}

