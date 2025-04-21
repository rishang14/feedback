
import React from 'react'
import { SignupForm } from '@/components/ui/signupForm'
 

const page = () => {
  return (
     <div className="flex relative h-svh w-full items-center justify-center p-6 md:p-10"> 
      <div className="absolute bg-zinc-900/10 inset-0 -z-10  bg-[size:4rem_4rem] bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)]"></div>
          <div className="w-full max-w-sm">
            <SignupForm />
          </div>
        </div>
  )
}

export default page