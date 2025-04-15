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

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}


const page = () => {
  const { id } = useParams();
  console.log(id);
  // @ts-ignore
  const { getspaceReviewForm } = useGetSpace();

  useEffect(() => {
    if (id) getspaceReviewForm(id as string);
  }, []);
  return (
    <>
      <main className="min-h-screen flex items-center  bg-gray-100">
        <div className="container mx-auto max-w-4xl p-4 flex items-center justify-center md:p-8">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <div className="text-center mb-8">
              <h1 className="text-xl font-semibold text-gray-800">
                Testimonial
              </h1>
              <p className="text-gray-700">
                write a warm medsaer oto the users todfjk i would love to kno
                what is going on here pls tell me
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6 border-b-4 border-indigo-500 pb-2 inline-block">
                QUESTIONS
              </h2>
              <ul className="space-y-4 mt-4">
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span>
                    what are you doing pls tell me i want to know about you
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span>why are not yu replying me whts the issue</span>
                </li>
              </ul>
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <TestimonialFormButton spacename={id as string} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default page; 


export function TestimonialFormButton({ spacename }: { spacename: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-indigo-500 hover:bg-indigo-600 text-white"
      >
        Write a testimonial
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-md md:max-w-lg  max-h-[95%] overflow-y-scroll"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-xl">Write review</DialogTitle>
          </DialogHeader>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 border-b-2 border-indigo-500 pb-1 inline-block">
              Questions
            </h3>
            <ul className="space-y-2 mt-3">
              <li className="flex items-start">
                <span className="text-gray-900 mr-2">•</span>
                <span className="text-sm  text-gray-500">
                  what are you doing pls tell me i want to know about you
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-2">•</span>
                <span className="text-sm">
                  why are not yu replying me whts the issue
                </span>
              </li>
            </ul>
          </div>
          <ReviewForm closeModal={() => setOpen(false)} spacename={spacename} />
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
