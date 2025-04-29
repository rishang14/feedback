
import React from 'react'
import { SignupForm } from '@/components/ui/signupForm'
import Link from 'next/link'
 

const page = () => {
  return (
     <div className="relative w-full flex  items-center gap-3  justify-center flex-col min-h-screen p-6 md:p-10">  
     <Link href={"/"}>
      <h1  className='text-3xl text-white '>
      ReviewVault
      </h1>
     </Link> 
      <div className="absolute bg-zinc-900/10 inset-0 -z-10   bg-[size:4rem_4rem] bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)]"></div>
<div className="w-full max-w-sm">
            <SignupForm />
          </div>
     </div>
    
  )
}

export default page