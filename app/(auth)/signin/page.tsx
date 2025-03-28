import React from 'react'
import { LoginForm } from '@/components/ui/loginForm';

// async function  getcsrf(){
//   const token=await cookies(); 
//   return token.get("authjs.csrf-token")?.value ?? "" ;  

// }
const page = async () => {   
//  let csrf= await getcsrf(); 
//  console.log(csrf,"csrf")
  return ( 

   <> 
     <div className="flex h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm  />
      </div>
    </div>
   </>
  )
}

export default page 