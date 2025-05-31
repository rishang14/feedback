"use client";

import { useState } from "react";
import { Star, Quote } from "lucide-react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import { Avatar ,AvatarFallback} from "./ui/avatar";

const ReviewsCollectionTwo = ({ testimonial, ind }: any) => {
  const [visibleItems, setVisibleItems] = useState(8);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "small":
        return "md:col-span-1 md:row-span-1";
      case "medium":
        return "md:col-span-1 md:row-span-2";
      case "large":
        return "md:col-span-2 md:row-span-2";
      default:
        return "md:col-span-1 md:row-span-1";
    }
  };
  return (
    <Card
      key={testimonial.id}
      className={cn(
        " masonry-card  group relative bg-card hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1",
        // getSizeClasses(testimonial.size)
      )}
      style={{
        animationDelay: `${ind * 100}ms`,
        animationDuration: "600ms",
        animationFillMode: "both",
        animationName: "fadeInUp",
      }}
    >
      <Quote className="absolute top-4 right-4 w-8 h-8 text-purple-200 dark:text-purple-700 group-hover:text-purple-400 transition-colors duration-300" />

      <CardHeader className="space-y-0">
        <div className="flex items-center">
         <Avatar>
            <AvatarFallback>
                {testimonial.name.charAt(0)}
            </AvatarFallback>
         </Avatar>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
              {testimonial.name}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {testimonial.email}
            </p>
          </div>
        </div>
        <div className="flex pt-3">{renderStars(testimonial?.rating)}</div>
      </CardHeader>

      <CardContent className="text-neutral-400 break-words">
          "{testimonial.text}"
      </CardContent>
    </Card>
  );
};

export default ReviewsCollectionTwo;
