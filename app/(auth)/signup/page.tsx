
import React from 'react'
import { SignupForm } from '@/components/ui/signupForm'
import { getToken } from 'next-auth/jwt'
 

console.log(getToken,"token")
const page = () => {
  return (
     <div className="flex h-svh w-full items-center justify-center p-6 md:p-10"> 
          <div className="w-full max-w-sm">
            <SignupForm />
          </div>
        </div>
  )
}

export default page