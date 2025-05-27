import { useState } from "react";
import dynamic from "next/dynamic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrashIcon, Tags, HeartIcon, X } from "lucide-react";
import { HiOutlineArchiveBoxArrowDown } from "react-icons/hi2";
import { LuArchiveRestore } from "react-icons/lu";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { UseTestimonial } from "@/store/testimonial";
import { toast } from "sonner";
import { useSpaceDetails } from "@/store/spaceDetails";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TestimonialProps {
  item: {
    name: string;
    email: string;
    _id: string;
    text: string;
    avatar?: string;
    rating?: number;
    tags: string[];
    walloflove: boolean;
    archeived: boolean;
  }; 
 
  spctags?: Array<string>;
  spaceid: string;
  tab: string;
}

export function TestimonialCard({
 item,
  spaceid,
  tab,
  // onAction, 
  spctags, 
}: TestimonialProps) {
  // @ts-ignore
  const { likeTestimonial, unlikeTestimonial, archive, unarchive, reovetag } =
    UseTestimonial();
  // @ts-ignore
  const { getreviews } = useSpaceDetails();
  const [open, setisopen] = useState({
    deletedialog: false,
    tagdialog: false,
  });
  const handlelikeUnlike = async (state: boolean, id: string) => {
    try {
      const res = state
        ? await unlikeTestimonial(id as string)
        : await likeTestimonial(id as string);

      if (res.success && state === false) {
        console.log("i am triggered");
        toast.success("You liked a Testimonial", { duration: 3000 });
      }
      if (res.success && state === true) {
        console.log("i am also triggered");
        toast.success("You unliked a Testimonial", { duration: 3000 });
      }
    } catch (error) {
      toast.error("Pls try again");
    } finally {
      await getreviews(spaceid,tab);
    }
  };

  const handlearchive = async (status: boolean, reviewId: string) => {
    try {
      const res = status ? await unarchive(reviewId) : await archive(reviewId);
      if (res.success && status) {
        toast.success("unarchived successfully", { duration: 3000 });
      }
      if (res.success && !status) {
        toast.success("archived successfully", { duration: 3000 });
      }
    } catch (error) { 
      toast.error("something went wrong")
    } finally {
       await getreviews(spaceid,tab);
    }
  };

  const handleRemoveTag = async (id: string, tagname: string) => {
    try {
      const res = await reovetag(id, tagname);
      if (res.success) {
        toast.success("Removed Successfully", { duration: 2000 });
         await getreviews(spaceid,tab);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  const DeleteReview = dynamic(() => import("./deletereview"), {
    ssr: false,
  });

  const ReviewTagManager = dynamic(() => import("./reivewformtag"), {
    ssr: false,
  });
  return (
    <>
      <div className="group relative mx-auto max-w-2xl overflow-hidden bg-card rounded-xl bg-gradient-to-br md:p-6 p-2.5  shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 sm:p-8">
        <div className="flex items-start gap-2 justify-between w-full ">
          <div className="mb-6 flex items-center max-w-[90%]  gap-4">
            <Avatar className="h-14 w-14 ring-2 ring-slate-700/50 ring-offset-2 ring-offset-slate-900">
              <AvatarImage src={item?.avatar ?? ""} alt={item.name} />
              <AvatarFallback className="bg-slate-800 text-lg text-slate-200">
                {item.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold text-slate-100">{item.name}</h3>
              <p className="text-sm text-slate-400">{item.email}</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={"secondary"}
              size={"icon"}
              onClick={() => handlelikeUnlike(item.walloflove as boolean, item._id as string)}
            >
              {" "}
              <HeartIcon
                className={`w-5 h-5 text-red-600  ${
                  item.walloflove ? "fill-red-600" : ""
                }`}
              />
            </Button>
            <Button
              variant={"secondary"}
              size={"icon"}
              onClick={() =>
                setisopen((prev) => ({
                  ...prev,
                  deletedialog: true,
                }))
              }
            >
              {" "}
              <TrashIcon color="#fff" className="w-5 h-5" />{" "}
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"secondary"}
                    size={"icon"}
                    onClick={() => handlearchive(item.archeived as boolean, item._id)}
                  >
                    {" "}
                    {item.archeived ? (
                      <LuArchiveRestore color="#fff" className="w-5 h-5" />
                    ) : (
                      <HiOutlineArchiveBoxArrowDown
                        color="#fff"
                        className="w-5 h-5"
                      />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {item.archeived ? "Unarchive review" : "Archive review"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="relative"> 
          
          <p className="text-lg leading-relaxed  break-words text-slate-300">
            {item.text}
          </p>
     
          {item?.rating && (
            <div className="flex ">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${ 
                    // @ts-ignore
                    star <= item.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  } transition-colors`}
                />
              ))}
            </div>
          )}
          {tab === "review" && (
            <div className="mt-6 flex md:flex-row flex-col flex-wrap justify-between gap-3">
              <div className=" flex gap-2 items-center ">
                {item?.tags.map((i) => (
                  <div
                    className="flex items-center p-1  px-2 gap-2  bg-card  rounded-sm border-card-foreground shadow-sm shadow-amber-50"
                    key={i}
                  >
                    <span className="text-gray-200">{i}</span>
                    <span
                      className="curosr-pointer"
                      onClick={() => handleRemoveTag(item._id, i)}
                    >
                      <X className="w-4 h-4 cursor-pointer text-white" />
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  className="text-neutral-400"
                  variant={"outline"}
                  size={"sm"}
                  onClick={() =>
                    setisopen((prev) => ({
                      ...prev,
                      tagdialog: true,
                    }))
                  }
                >
                  {" "}
                  <Tags /> Add Tag{" "}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <DeleteReview
        isopen={open.deletedialog}
        spaceid={spaceid}
        onchangeopen={(value: boolean) =>
          setisopen((prev) => ({
            ...prev,
            deletedialog: value as boolean,
          }))
        }
        reviewid={item._id}
      />
      <ReviewTagManager
        isTagDialogOpen={open.tagdialog}
        setIsTagDialogOpen={(val: boolean) =>
          setisopen((prev) => ({
            ...prev,
            tagdialog: val,
          }))
        }
        id={item._id}
        spcid={spaceid}
        spctags={spctags as Array<string>}
        reviewtags={item.tags as Array<string>}
      />
    </>
  );
}
