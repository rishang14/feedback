"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useGetSpace } from "@/store/getSpace";
import { useState } from "react";
import { Star } from "lucide-react";
import ReviewForm from "@/components/reviewform";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Loading from "@/app/loading";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const page = () => {
  const { id } = useParams();
  console.log(id);
  // @ts-ignore
  const { getspaceReviewForm, spaceReviewDetail } = useGetSpace();
  console.log(typeof spaceReviewDetail, "detail");
  console.log(spaceReviewDetail);
 

  
  useEffect(() => {
    if (id) getspaceReviewForm(id as string);
  }, []);
  
  if (Object.keys(spaceReviewDetail).length === 0) return <Loading />;
  return (
    <>
      <main className="min-h-screen flex items-center  bg-gray-100">
        <div className="container mx-auto max-w-4xl p-4  flex items-center justify-center md:p-8">
          <div className="bg-white rounded-lg md:min-w-150  shadow-md p-6 md:p-8">
            <div className="text-center mb-8">
              <h1 className="text-xl font-semibold text-gray-800">
                {spaceReviewDetail?.header}
              </h1>
              <p className="text-gray-700">
                {spaceReviewDetail?.customDescription}
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6 border-b-4 border-indigo-500 pb-2 inline-block">
                {spaceReviewDetail?.questionlabel}
              </h2>
              <ul className="space-y-4 mt-4">
                {spaceReviewDetail?.questions?.map((item: any) => {
                  return (
                    <li className="flex items-start" key={item._id}>
                      <span className="text-gray-600 mr-2">•</span>
                      <span>{item.question}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <TestimonialFormButton
                spacename={id as string}
                spacedetails={spaceReviewDetail}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default page;

type prop = {
  spacename: string;
  spacedetails: any;
};

export function TestimonialFormButton({ spacename, spacedetails }: prop) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-indigo-500 hover:bg-indigo-600 text-white"
      >
        {spacedetails?.textbuttonText}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-md md:max-w-lg  max-h-[95%] md:overflow-y-hidden overflow-y-scroll"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-xl">Write review</DialogTitle>
          </DialogHeader>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 border-b-2 border-indigo-500 pb-1 inline-block">
              {spacedetails?.questionlabel}
            </h3>
            <ul className="space-y-2 mt-3">
              {spacedetails?.questions?.map((item: any) => {
                return (
                  <li className="flex items-start" key={item._id}>
                    <span className="text-gray-600 mr-2">•</span>
                    <span>{item.question}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <ReviewForm
            closeModal={() => setOpen(false)}
            spacename={spacename}
            spacedetail={spacedetails}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export function StarRating({ rating, onRatingChange }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(5);

  return (
    <div className="flex items-center  gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="focus:outline-none"
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        >
          <Star
            className={`h-5 w-5 ${
              star <= (hoverRating || rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
}
