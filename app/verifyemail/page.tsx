"use client"

import React, { useEffect } from 'react'  
import { useState } from 'react'; 
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"
import axios from 'axios';  
import { MultiStepLoader } from '@/components/ui/multi-step-loader';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Loading from '../loading';

const loadingStates = [
  { text: "Fetching Your email..." },
  { text: "Sending it to Backends..." },
  { text: "Checking up the email..." },
  { text: "Verifying email..." },
  { text: "Finalizing setup..." },
];

const Page = () => {      
  const [token,setToken]=useState< string | null>(null) 
  const [loading,setLoading]=useState(false) 
  const router=useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {   // safe check (optional)
      const searchParams = new URLSearchParams(window.location.search);
      const tokenFromURL = searchParams.get('token');
      setToken(tokenFromURL);
      if (tokenFromURL) console.log(tokenFromURL, "token");
    }
  }, []);  

  const verifyEmail = async()=>{ 
    setLoading(true)
  try {
    const res= await axios.post("/api/auth/verifyemail",{token} );  
    // @ts-ignore
    console.log(res?.response?.data)
     toast.success("Email is Verified Login Now",{duration:2000}) ; 
     router.push("/signin")
  } catch (error:any) {
    console.log(error) 
    if(error.status ===400){ 
      // @ts-ignore 
       toast.error(error?.response?.data?.error,{duration:3000})
     }  
  }finally{
   setLoading(false)
  }
  }
  console.log(token,"token") 

  // if(loading) return (
  //   <div className=" flex items-center bg-black justify-center w-full min-h-screen">
  //     {loading && (
  //       <MultiStepLoader
  //         loadingStates={loadingStates}
  //         loading={loading}
  //         duration={1000}
  //       />
  //     )}
  //   </div>
  // ) 
  if(loading) return <Loading/>
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121212]">
      <Card className="w-full max-w-md bg-[#1e1e1e] border-[#333333] text-white">
        <CardHeader className="space-y-1 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-[#2563eb] rounded-full flex items-center justify-center mb-2">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl text-white">Verify Your Email</CardTitle>
          <CardDescription className="text-[#a1a1aa]">
            We've sent a verification link to your email address. Please verify your account to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-[#d4d4d8]">
          <p>
            If you haven't received the email within a few minutes, please check your spam folder or click the button
            below to verify directly.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium" onClick={()=>verifyEmail()}>Click me to verify</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Page;