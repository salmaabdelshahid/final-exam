import CredentialsProvider from "next-auth/providers/credentials";

import { FailLogin, SuccessLogin } from "@/interface";
import { AuthOptions } from "next-auth";

export const authOptions : AuthOptions = {
  providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials : {
            email : {},
            password : {}
        },
        authorize : async (credentials)=>{
            const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin",
                {   method : "POST",
                    body: JSON.stringify({
                        email : credentials?.email,
                        password : credentials?.password
                    }),
                    headers:{"content-type":"application/json"}
                }
            )
            const payload : SuccessLogin|FailLogin = await response.json()
            if ("token" in payload){
                return {
                id : payload.user.email,
                user : payload.user,
                token : payload.token
            }
            }else {
                throw new Error(payload.message)
            }
        }
    })
  ],
  callbacks:{
    jwt: ({token,user})=>{
         if(user){
            token.token = user.token,
         token.user= user.user
         }
         return token
    },
    session : ({session, token})=>{
        session.user= token.user
        return session
    }
  },
  pages : {
    signIn : "/login",
    error : "/login"
  },
  secret : process.env.NEXTAUTH_SECRET
}