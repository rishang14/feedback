"use client";
import { Star, Sparkles, Sidebar } from "lucide-react";
import Masonry from "react-masonry-css";
import AcceternityReviewsCollection from "@/components/ReviewsCollectionone";
import ReviewsCollectionTwo from "@/components/ReviewsCollectionTwo";
import ReviewCollectionThree from "@/components/ReviewCollectionThree";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSpaceDetails } from "@/store/spaceDetails";
import Loading from "../loading";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};
type TestimonialStyle = keyof typeof Testimonialobj;
export const MasonaryComp = ({ testimonials }: any) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {testimonials.map((item: any, ind: any) => (
        <ReviewsCollectionTwo testimonial={item} key={ind} ind={ind} />
      ))}
    </Masonry>
  );
};


const Testimonialobj = {
  one: ({ testimonials }: any) =>
    testimonials.map((item: any, ind: any) => (
      <AcceternityReviewsCollection testimonial={item} key={ind} ind={ind} />
    )),
  two: MasonaryComp,
  three: ({ testimonials }: any) =>
    testimonials.map((item: any, ind: any) => (
      <ReviewCollectionThree testimonial={item} index={ind} key={ind} />
    )),
} as const;

const Page = () => {
  // @ts-ignore
  const { embedReviews } = useSpaceDetails();
  const [error, setError] = useState(""); 
  const [loading,setloading]=useState(false)
  const query = useSearchParams();
  let spcid = query.get("sid");
  console.log(spcid, "id");
  let style: string = query.get("style") ?? "one";
  const styles: TestimonialStyle =
    style && ["one", "two", "three"].includes(style)
      ? (style as TestimonialStyle)
      : "one";
  const pathname = usePathname();
  const [review, setReviews] = useState([]);

  useEffect(() => {
    if (spcid === null || spcid === "") {
      setError("pls provide spcid");
    }
    if(!["one","two","three"].includes(style)){
      setError("Pls select valid style")
    }
  }, [spcid,style]);
  useEffect(() => {
    async function getdetails() { 
      setloading(true)
      try {
        const res = await embedReviews(spcid);
        if (res.error) {
          setError(res.errormsg);
        } else {
          setReviews(res.review);
        }
      } catch (error: any) {}finally{
        setloading(false)
      }
    }

    getdetails();
  }, [query, pathname]);

  if (error !== "") return <p className="text-white text-xl">{error}</p>; 

  if(loading) return <Loading/> 

  if(review.length === 0) return <p className="text-white text-xl">oopse there is no reivew available to show</p>
  const Component = Testimonialobj[styles];
  return (
    <div className="container bg-background p-4">
     {
      style === "two" ?  <Component testimonials={review} /> : 
       <div className="grid grid-cols-1 max-w-[1290px] mx-auto md:grid-cols-4 gap-4 auto-rows-min mb-8">
        <Component testimonials={review} />
      </div>
     }
    </div>
  );
};

export default Page;
