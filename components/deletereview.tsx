"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { UseTestimonial } from "@/store/testimonial";
import { useSpaceDetails } from "@/store/spaceDetails";

type prop = {
  isopen: boolean;
  onchangeopen: React.Dispatch<React.SetStateAction<boolean>>;
  spaceid: string;
  reviewid: string;
};

const DeleteReviewDialog = ({
  isopen,
  onchangeopen,
  spaceid,
  reviewid,
}: prop) => {
  // @ts-ignore
  const { deleteTestimonial } = UseTestimonial();
  //   @ts-ignore
  const { getSpaceDetails } = useSpaceDetails();
  const [pending, setpending] = useState(false);
  const handleDelete = async (id: string) => {
    setpending(true);
    try {
      const res = await deleteTestimonial(id as string);
      if (res.success) {
        onchangeopen(false);

        toast.success("Review is deleted", { duration: 3000 });
      } else {
        toast.error("error while deleting ");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setpending(false);
      await getSpaceDetails(spaceid);
    }
  };
  return (
    <AlertDialog open={isopen}>
      <AlertDialogContent className=" bg-zinc-950">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white ">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            This action cannot be undone. This will permanently delete your
            Review and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="text-white bg-blue-500  hover:bg-blue-600"
            disabled={pending}
            onClick={() => onchangeopen(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="text-white  bg-red-500"
            disabled={pending}
            onClick={() => handleDelete(reviewid)}
          >
            {pending ? "Deleting Review" : "Delete Review"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteReviewDialog;
