'use client'
import { Button } from "@mui/material";
import { useSession } from "next-auth/react"
import { signIn } from 'next-auth/react';
export default function UserMap() {
  const redirectUrl = process.env.NEXTAUTH_URL;
const logIn = (provider:string, email =undefined) => {
  email
    ? signIn(provider, {}, email)
    : signIn(provider, {});
};
    const {data,status} = useSession()
   
    return <div>
    {JSON.stringify(data)}
     <Button onClick={()=>{logIn("google")}}>test</Button>
    </div>

}
