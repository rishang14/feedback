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
     <div className="flex relative h-svh w-full items-center justify-center p-6 md:p-10">
     <div className="absolute bg-zinc-900/10 inset-0 -z-10  bg-[size:4rem_4rem] bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)]"></div>
      <div className="w-full max-w-sm">
        <LoginForm  />
      </div>
    </div>
   </>
  )
}

export default page 