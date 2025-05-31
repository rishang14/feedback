"use client";
import { Avatar, AvatarFallback } from "./ui/avatar";
import React, { useState, useEffect } from "react"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card" 
import   {Star} from "lucide-react"

const AcceternityReviewsCollection = ({ testimonial }: any) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
   const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-3 h-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }
  return ( 
      <Card
      className="group cursor-pointer relative overflow-hidden bg-card backdrop-blur-xl border-gray-700/50 hover:border-blue-400/50 transition-all duration-500 max-w-80"
      onMouseEnter={() => setHoveredCard(testimonial.id)}
      onMouseLeave={() => setHoveredCard(null)}
      style={{
        transform: hoveredCard === testimonial.id ? "scale(1.05)" : "scale(1)",
        zIndex: hoveredCard === testimonial.id ? 50 : 10,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />

      <CardHeader className="pb-4">
        <div className="flex items-center">
          <div className="relative">
            <Avatar className="ring-2 ring-blue-400/50 group-hover:ring-blue-400 transition-all duration-300">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {testimonial.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </div>
          <div className="ml-3">
            <CardTitle className="text-white text-sm font-semibold">{testimonial.name}</CardTitle>
            <CardDescription className="text-gray-400 text-xs">{testimonial.email}</CardDescription>
          </div>
        </div> 
        {testimonial.rating && <div className="flex mt-2">{renderStars(testimonial?.rating)}</div>}
      </CardHeader>

      <CardContent className="pt-0 break-words">
        <p className="text-gray-300 leading-relaxed break-words text-sm">"{testimonial.text}"</p>
      </CardContent>
      {hoveredCard === testimonial.id && (
        <>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-ping" />
          <div
            className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full animate-ping"
            style={{ animationDelay: "0.5s" }}
          />
        </>
      )}
    </Card>
  );
};
export default AcceternityReviewsCollection;
