import React from 'react'
import { LoginForm } from '../_comp/loginForm'

const page = () => {
  return (
   <> 
     <div className="flex h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
   </>
  )
}

export default page