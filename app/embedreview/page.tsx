"use client"
import { Star, Sparkles } from "lucide-react"; 
import Masonry from 'react-masonry-css'
import AcceternityReviewsCollection from "@/components/ReviewsCollectionone";
import ReviewsCollectionTwo from "@/components/ReviewsCollectionTwo";
import ReviewCollectionThree from "@/components/ReviewCollectionThree";   

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

export const MasonaryComp = ({ testimonials }:any) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {testimonials.map((item:any, ind:any) => (
        <ReviewsCollectionTwo testimonial={item} key={ind} ind={ind} />
      ))}
    </Masonry>
  );
};
 
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@techcorp.com",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 5,
    text: "This product has completely transformed our workflow. The team collaboration features are outstanding and the interface is incredibly intuitive. We've seen a 300% increase in productivity!",
    size: "large",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@startup.io",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 5,
    text: "Amazing experience! The customer support is top-notch.",
    size: "small",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@design.co",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 4,
    text: "Great tool for our design team. Love the real-time collaboration and the clean interface makes everything so much easier to manage. The learning curve was minimal and our team adopted it quickly.",
    size: "medium",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david@innovate.com",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 5,
    text: "Incredible value for money. This has streamlined our entire process and saved us countless hours every week.",
    size: "medium",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    email: "lisa.t@marketing.pro",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 5,
    text: "The analytics dashboard is phenomenal. We've seen a 40% increase in productivity since implementing this solution. The insights have been game-changing for our marketing strategy.",
    size: "large",
  },
  {
    id: 6,
    name: "James Wilson",
    email: "j.wilson@enterprise.com",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 4,
    text: "Solid platform with excellent security features.",
    size: "small",
  },
  {
    id: 7,
    name: "Anna Martinez",
    email: "anna.m@creative.studio",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 5,
    text: "The creative possibilities are endless! Our team loves the flexibility and the constant updates keep improving the experience. It's like having a creative partner that never sleeps.",
    size: "large",
  },
  {
    id: 8,
    name: "Robert Taylor",
    email: "rob.taylor@consulting.biz",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 5,
    text: "Best investment we've made this year. ROI was visible within the first month.",
    size: "medium",
  },
  {
    id: 9,
    name: "Sophie Brown",
    email: "sophie@freelance.work",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 4,
    text: "As a freelancer, this tool has been a game-changer for managing multiple clients and projects efficiently. The time tracking features alone have paid for themselves.",
    size: "medium",
  },
  {
    id: 10,
    name: "Alex Turner",
    email: "alex.t@agency.digital",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 5,
    text: "Outstanding performance and reliability.",
    size: "small",
  },
  {
    id: 11,
    name: "Maria Garcia",
    email: "maria.g@nonprofit.org",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 5,
    text: "Perfect for our nonprofit organization. The pricing is fair and the features help us maximize our impact. We've been able to reach more people and manage our resources better than ever before.",
    size: "large",
  },
  {
    id: 12,
    name: "Tom Anderson",
    email: "tom.a@retail.shop",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 4,
    text: "Great for e-commerce integration. Has helped us streamline our inventory management.",
    size: "medium",
  },
];

const Testimonialobj = {
  one: ({ testimonials }:any) =>
    testimonials.map((item:any, ind:any) => (
      <AcceternityReviewsCollection testimonial={item} key={ind} ind={ind} />
    )),
  two: MasonaryComp,
  three: ({ testimonials }:any) =>
    testimonials.map((item:any, ind:any) => (
      <ReviewCollectionThree testimonial={item} index={ind} key={ind} />
    )),
};

const Page = () => {  


  const Component = Testimonialobj["three"];
  return (
    <div className="container bg-background">
     <div className="grid grid-cols-1 max-w-[1290px] mx-auto md:grid-cols-4 gap-4 auto-rows-min mb-8"> 
          <Component testimonials={testimonials}  />
        </div> 
    </div>
  );
};

export default Page; 





