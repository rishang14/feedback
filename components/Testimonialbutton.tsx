'use client' 
import { useState } from "react";
import { Button } from "./ui/button"; 
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
import ReviewForm from "./reviewform";
export function TestimonialFormButton({ spacename, spacedetails }: any) {
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
  