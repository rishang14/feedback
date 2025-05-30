import React from 'react' 
import { Card,CardContent } from './ui/card' 
import { Star } from 'lucide-react'
import { Avatar, AvatarFallback } from './ui/avatar'

const ReviewCollectionThree = ({testimonial ,index}:any) => { 
     const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }
  return (
     <Card
              key={testimonial.id}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Avatar>
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.email}</p>
                  </div>
                </div>
                <div className="flex mb-3">{renderStars(testimonial.rating)}</div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">"{testimonial.text}"</p>
              </CardContent>
            </Card>
  )
}

export default ReviewCollectionThree