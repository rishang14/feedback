import React from "react";
import { HeartCrack } from "lucide-react";
import { TestimonialCard } from "./testimonial.Card";
import { Button } from "./ui/button";

const Reviews = ({ testimonials }: any) => {
  return (
    <>
    <Button variant={"outline"} className="text-white ">All</Button>
      {testimonials?.length === 0 && (
        <div className="flex items-center  border-accent-foreground  flex-col justify-center  h-20">
          <HeartCrack className="w-8 h-8 text-white " />
          <p className="text-4xl text-white text-balance font-stretch-50%">Reviews are Not Available</p>
        </div>
      )}
      {testimonials.map((item: any) => {
        return (
          <TestimonialCard
            key={item._id}
            name={item?.name as string}
            email={item?.email as string}
            description={item?.text as string}
            avatar=""
            starred={item?.rating as number}
          />
        );
      })}
    </>
  );
};

export default Reviews;
