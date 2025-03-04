import React from 'react'
import { ModeToggle } from "@/components/ThemeToggler"; 
import Link from 'next/link'; 
import { Button } from '../ui/button';

const Nav = () => {
  return (
    <nav className='fixed top-0 bg-black/30  backdrop-blur-2xl w-full  shadow-lg border-b border-b-slate-800 z-[200]'> 
     <div className="flex justify-between items-center w-full mt-5 md:px-12 pb-3 px-4 ">
        <Link href="/" className="text-2xl text-white font-bold  ">
         ReviewVault
        </Link>  
        <div className="flex  items-center space-x-6">
          <Link href="/docs" className="font-medium hover:text-blue-300 text-white text-md">
           Features
          </Link>
          <Link href="/templates" className="font-medium hover:text-blue-300 text-white text-md">
            Login
          </Link>
          <Link href="/templates" > 
          <Button className='font-medium  text-white text-md bg-blue-400' >
           Signup
           </Button>
            Signup
          </Link>
        </div> 
      </div> 
    </nav>
  )
}

export default Nav