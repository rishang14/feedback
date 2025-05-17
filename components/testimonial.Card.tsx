import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  Save,
  TrashIcon, 
  Tags,
  MessageCircle,
  X,
  HeartIcon, 
  Archive
} from "lucide-react"; 
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import DropDownForTestimonial from "./DropDownForTestimonial";
interface TestimonialProps {
  name: string;
  email: string;
  description: string;
  avatar: string;
  date?: string;
  isLiked?: boolean;
  isSaved?: boolean;
  starred?: number;
  tags?:Array<string>
  // onAction?: (action: string) => void;
}

export function TestimonialCard({
  name,
  email,
  description,
  avatar,
  isLiked,
  isSaved,
  starred,
  // onAction,
  tags
}: TestimonialProps) {
  return (
    <div className="group relative mx-auto max-w-2xl overflow-hidden bg-card rounded-xl bg-gradient-to-br md:p-6 p-2.5  shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 sm:p-8"> 
    <div className="flex items-start gap-2 justify-between w-full ">
      <div className="mb-6 flex items-center max-w-[90%]  gap-4">
        <Avatar className="h-14 w-14 ring-2 ring-slate-700/50 ring-offset-2 ring-offset-slate-900">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-slate-800 text-lg text-slate-200">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold text-slate-100">{name}</h3>
          <p className="text-sm text-slate-400">{email}</p>
        </div>
      </div>   
      <div className="flex gap-2 flex-wrap">
      <Button variant={"secondary"} size={"icon"}> <HeartIcon className="w-5 h-5 text-red-600 "/></Button> 
      <Button variant={"secondary"} size={"icon"}> <TrashIcon color="#fff"  className="w-5 h-5"/>  </Button> 
      </div>
      </div>

      <div className="relative">
        <p className="text-lg leading-relaxed text-slate-300">{description}</p> 
     {
       starred && (
        <div className="flex "> 
        {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star}
              className={`h-5 w-5 ${
                star <= ( starred)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              } transition-colors`}
            />
            ))}
        </div>
       )
     }
        <div className="mt-6 flex md:flex-row flex-col flex-wrap justify-between gap-3"> 
          <div className=" flex gap-2 items-center "> 
            <div className="flex items-center p-1  px-2 gap-2  bg-card  rounded-sm border-card-foreground shadow-sm shadow-amber-50">
              <span className="text-gray-200">tags</span> 
            </div>
          </div> 
          <div className="flex gap-2 flex-wrap">
            <Button className="text-neutral-400" variant={"outline"} size={"sm"}>  <Archive  /> Archive </Button>
            <Button className="text-neutral-400" variant={"outline"} size={"sm"}>   <Tags  /> Manage Tag </Button>
          </div>
           {/* <DropDownForTestimonial id=""/> */}
        </div>
      </div>
    </div>
  );
}


