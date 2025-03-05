import React from 'react'
import { ModeToggle } from "@/components/ThemeToggler"; 
import Link from 'next/link'; 
import { Button } from '../ui/button';

const Nav = () => {
  return (
    <header className=' bg-black/30  backdrop-blur-2xl w-full  shadow-lg border-b border-b-slate-800 z-[200]'> 
     <nav className="flex justify-between items-center w-full mt-5 md:px-12 pb-3 px-4 ">
        <Link href="/" className="text-2xl text-white font-bold  ">
         ReviewVault
        </Link>  
        <div className="flex  items-center space-x-6">
          <Link href="/docs" className="font-medium hover:text-blue-300 text-white text-md">
           Features
          </Link>
          <Link href="/templates" className="font-medium hover:text-blue-300 text-white text-md">
            Sign-up
          </Link>
          <Button className='font-medium hover:bg-blue-300   text-md  bg-blue-500' asChild={true} variant={"default"} >
          <Link href="/" className=' text-white'> 
           Sign-in
          </Link>
           </Button>
        </div> 
      </nav> 
    </header>
  )
}

export default Nav