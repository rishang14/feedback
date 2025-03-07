import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
  } from "@/components/ui/card"

const Dashboardcard = () => {
  return (
   <Card  className='bg-gray-800 overflow-hidden rounded-lg border border-gray-700 shadow-sm" '>
    <CardContent className=' '>
        <div className='flex justify-between  md:w-[280px]'>
          <p className='text-white text-xl font-medium '> Hello</p> 
          <span className='text-white text-xl font-medium'>icon</span>
        </div>
    </CardContent> 
    <CardDescription>

    </CardDescription>
   </Card>
  )
}

export default Dashboardcard;