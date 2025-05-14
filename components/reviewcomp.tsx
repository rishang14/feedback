import React, { useState } from "react";
import { HeartCrack } from "lucide-react";
import { TestimonialCard } from "./testimonial.Card";
import { Button } from "./ui/button";
import Loading from "@/app/loading";

type reviewprop = {
  testimonials: any[] | null; 
  tags:Array<string>
};
const Reviews = ({ testimonials,tags }: reviewprop) => {
  const [active,setActive]=useState("all") 

   const handleChange=(tag:string)=>{
     setActive(tag)
   }
  if (testimonials === null) return <Loading />;
  return (
    <>
     <div className=" w-full flex items-center gap-2 flex-wrap   space-x-2 ">
     <Button variant={"outline"} className={`text-white  ${active === "all" ? "bg-neutral-600" :""}`} onClick={()=>handleChange("all")}>
        All
      </Button>  
      {
        tags?.map((tagButon:string) =>{
          return  <Button variant={"outline"} className={`text-white  ${active === tagButon ? "bg-neutral-600" : ""}`} key={tagButon}  onClick={()=>handleChange(tagButon)} >
          {tagButon}
        </Button>
        })
      }
     </div>
      {testimonials?.length === 0 && (
        <div className="flex items-center  border-accent-foreground  flex-col justify-center  h-20">
          <HeartCrack className="w-8 h-8 text-white " />
          <p className="text-4xl text-white text-balance font-stretch-50%">
            Reviews are Not Available
          </p>
        </div>
      )}
      {testimonials?.map((item: any) => {
        return (
          <TestimonialCard
            key={item._id}
            name={item?.name as string}
            email={item?.email as string}
            description={item?.text as string}
            avatar=""
            starred={item?.rating as number} 
            tags={tags}
          />
        );
      })}
    </>
  );
};

export default Reviews;
