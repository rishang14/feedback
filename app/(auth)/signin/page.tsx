import React from 'react'
import { LoginForm } from '@/components/ui/loginForm';
import Footer from '@/components/ui/Footer';
import Link from 'next/link'; 

// async function  getcsrf(){
//   const token=await cookies(); 
//   return token.get("authjs.csrf-token")?.value ?? "" ;  

// }
const Page = async () => {   
//  let csrf= await getcsrf(); 
//  console.log(csrf,"csrf")
  return ( 
     <div className="flex  relative min-h-screen w-full flex-col gap-3 items-center justify-center p-6 md:p-10">
       <Link href={"/"}>
      <h1  className='text-3xl text-white '>
      ReviewVault
      </h1>
     </Link> 
     <div className="absolute bg-zinc-900/10 inset-0 -z-10  bg-[size:4rem_4rem] bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)]"></div>
      <div className="w-full max-w-sm">
        <LoginForm  />
      </div> 
    </div>

  )
}

export default Page 