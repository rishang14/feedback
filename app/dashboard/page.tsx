import React from 'react'
import Dashboardcard from './_comp/dashboardcard' 
import { Button } from '@/components/ui/button'

const page = () => {
  return (
    <div  className='w-full mt-20 max-w-[1080]  md:mx-auto '> 
    <div className='flex items-center space-x-5 md:flex-row flex-col'>  
    <div className='p-5 flex items-center'>
    <h1 className=' md:text-4xl text-2xl font-bold text-center mb-4  text-white '>Overview :</h1>
    </div> 
    <div className='flex-1 flex md:flex-row items-center flex-col md:space-x-4 md:space-y-0 space-y-4 p-3'>
    <Dashboardcard />
    <Dashboardcard />
    </div> 
    </div>  
    <div className='flex  w-full'>
    <div className='p-5 flex items-center justify-between'>
    <h1 className=' md:text-4xl text-2xl font-bold   text-white '>Overview :</h1> 
    </div> 
    </div> 
    </div>
  )
}

export default page