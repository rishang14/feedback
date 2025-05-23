import React, { useState } from "react";
import { z } from "zod";
import { HeartCrack } from "lucide-react";
import { TestimonialCard } from "./testimonial.Card";
import { Button } from "./ui/button";
import Loading from "@/app/loading";
import { testimonialSchema } from "@/app/types/schema";

type review = z.infer<typeof testimonialSchema>;

type reviewprop = {
  testimonials: review[] ;
  tags: Array<string>;
  spaceid: string;
  tab: string;
};
const Reviews = ({ testimonials, tags, spaceid, tab }: reviewprop) => {
  const [active, setActive] = useState("all");
  console.log(testimonials, "test ");
  const handleChange = (tag: string) => {
    setActive(tag);
  }; 
  const filteredReviews = React.useMemo(() => {
  if (!testimonials) return [];
  if (active === "all") return testimonials;
  return testimonials.filter(item => item.tags.includes(active));
}, [testimonials, active]);


  if (testimonials === null) return <Loading />; 
  if(testimonials.length === 0 ) return <div className="flex items-center  border-accent-foreground  flex-col justify-center  h-20">
          <HeartCrack className="w-8 h-8 text-white " />
          <p className="text-4xl text-white text-balance font-stretch-50%">
            {
                "No reviews are available"   
            }
          </p>
        </div>

  return (
    <>
      {tab === "Review" && (
        <div className=" w-full flex items-center gap-2 flex-wrap   space-x-2 ">
          <Button
            variant={"outline"}
            className={`text-white  ${
              active === "all" ? "bg-neutral-600" : ""
            }`}
            onClick={() => handleChange("all")}
          >
            All
          </Button>
          {tags?.map((tagButon: string) => {
            return (
              <Button
                variant={"outline"}
                className={`text-white  ${
                  active === tagButon ? "bg-neutral-600" : ""
                }`}
                key={tagButon}
                onClick={() => handleChange(tagButon)}
              >
                {tagButon}
              </Button>
            );
          })}
        </div>
      )}
      {filteredReviews?.length === 0 && (
        <div className="flex items-center  border-accent-foreground  flex-col justify-center  h-20">
          <HeartCrack className="w-8 h-8 text-white " />
          <p className="text-4xl text-white text-balance font-stretch-50%">
            {
              tab === "Review" ?  "No reviews are available"    : `Pls ${tab} review .` 
            }
          </p>
        </div>
      )}
      {filteredReviews?.map((item: any) => {
        return (
          <TestimonialCard
            key={item._id}
            name={item?.name as string}
            email={item?.email as string}
            description={item?.text as string}
            avatar=""
            starred={item?.rating as number}
            spctags={tags}
            reviewtags={item.tags}
            id={item._id}
            isLiked={item.walloflove}
            isarchived={item.archeived}
            spaceid={spaceid} 
            tab={tab}
          />
        );
      })}
    </>
  );
};

export default Reviews;
