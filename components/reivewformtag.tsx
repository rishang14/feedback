import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import React, { useState } from "react";
import { CirclePlus } from "lucide-react";
import { UseTestimonial } from "@/store/testimonial";
import { toast } from "sonner";
import { useSpaceDetails } from "@/store/spaceDetails";

type props = {
  isTagDialogOpen: boolean;
  setIsTagDialogOpen: (open: boolean) => void;
  spctags: Array<string>;
  reviewtags: Array<string>;
  id: string;
  spcid: string;
};
const ManageReviewTags = ({
  isTagDialogOpen,
  setIsTagDialogOpen,
  spcid,
  spctags,
  reviewtags,
  id,
}: props) => {
  // @ts-ignore
  const { addtag } = UseTestimonial();
  const [loading, setLoading] = useState(false);
  //    @ts-ignore
  const { getreviews } = useSpaceDetails();
  const addTag = async (name: string, id: string) => {
    setLoading(true);
    try {
      const res = await addtag(id, name);
      if (res.success) {
        toast.success("Tag added Successfully", { duration: 2000 });
       
      }
    } catch (error) {
      toast.error("something went wrong", { duration: 3000 });
    } finally {
      setLoading(false); 
       await getreviews(spcid,"review");
    }
  };
  return (
    <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">
            Apply tags to this testimonial
          </DialogTitle>
          <DialogDescription>
            You can add multiple tags if you want. Manage all your tags{" "}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-white"> Apply Tags : </h2>
          <div className="flex items-center gap-2 flex-wrap">
            {spctags.map((item: string, i) => { 
              const alreadyExists= reviewtags.includes(item)
                return (
                  <Button
                    size={"sm"}
                    variant={"secondary"}
                    key={i} 
                    onClick={() => addTag(item, id)}
                    disabled={loading || alreadyExists}
                  >
                    <CirclePlus className="text-white w-4 h-4 " /> {item}
                  </Button>
                );
              })}
        </div> 
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageReviewTags;
