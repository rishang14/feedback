import React from 'react' 
import { Button } from '@/components/ui/button' 
import { Card } from '@/components/ui/card' 
import { Input } from '@/components/ui/input' 
import { Textarea } from '@/components/ui/textarea' 
import { Video,Send } from 'lucide-react'

const page = () => {
  return (
    <>
    <div className=' w-full h-full flex justify-center bg-white'>
    <div className="mx-auto max-w-2xl px-4 md:mt-15 mt-5 text-center md:p-4 p-2 sm:px-6">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          Header
        </h1>
        <p className="mb-4 text-base text-gray-600 sm:text-lg">
          write a warm medsaer oto the users todfjk i would love to kno what is going on here pls tell me 
        </p>
      {/* Questions Section */}
      <div className="mx-auto max-w-2xl mt-10 px-4 sm:px-6"> 
        <div className='flex flex-col justify-start  '>
        <h2 className="mb-6 text-xl text-start sm:mb-8 sm:text-2xl">QUESTIONS</h2>
        <ul className="mb-12 space-y-4 text-sm text-gray-600 sm:text-base">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>what are you doing pls tell me i want to know about you</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>why are not yu replying me whts the issue</span>
          </li>
        </ul>
        </div>
        {/* Form Card */}
        <Card className="mx-auto overflow-hidden p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl sm:p-6">
          <form className="space-y-4 sm:space-y-6">
            <div className="space-y-4">
              <Input 
                placeholder="Your name" 
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20" 
              />
              <Input 
                placeholder="Your email" 
                type="email" 
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20" 
              />
              <Textarea 
                placeholder="Your message" 
                className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-primary/20" 
              />
            </div>
          </form>
        </Card>

        <div className="mt-8 flex flex-col gap-3 px-4 sm:flex-row sm:justify-center sm:gap-4 sm:px-0">
          <Button 
            className="flex w-full items-center justify-center gap-2 bg-[#6366f1] text-white transition-colors duration-200 hover:bg-[#4f46e5] sm:w-auto"
          >
            <Video className="h-5 w-5" />
            Record a video
          </Button>
          <Button 
            variant="secondary" 
            className="flex w-full items-center justify-center gap-2 transition-colors duration-200 sm:w-auto"
          >
            <Send className="h-5 w-5" />
            Send in text
          </Button>
        </div>
      </div> 
      </div>
    </div>
    </>
  )
}

export default page