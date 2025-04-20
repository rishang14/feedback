"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "./ui/dialog"; 
import { PencilIcon } from "lucide-react";
import { Button } from "./ui/button"; 
type Props = {
  edit: boolean;
  spaceid?: string;
};

export const OpenSpaceFormButton = ({ edit,spaceid }:Props) => {
  console.log(edit, "editvalue"); 
  console.log(spaceid,"id")
  const [open, setOpen] = useState(false);

  const SpaceForm = dynamic(() => import("./spaceform"), {
    ssr: false,
  });
  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true}>
      {/* Button to open modal */}
      <DialogTrigger asChild>
        <Button size={"lg"} className=" bg-blue-600 flex items-center text-gray-200 justify-center space-x-2 cursor-pointer">
        {edit ? (
    <>
      <PencilIcon className="w-4 h-4" />
      Edit Space
    </>
  ) : (
    "+ Create a new Space"
  )}
        </Button>
      </DialogTrigger>
      <DialogContent
        className=" flex flex-col p-6 z-1000 min-w-[80%] min-h-screen max-h-screen overflow-y-scroll bg-gradient-to-b from-zinc-50 to-white "
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className=" text-4xl font-bold tracking-tight mb-2 text-center">
            {edit ? " Edit Your Review Form" : " Customize Your Review Form"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-lg text-center">
            Design the perfect Review collection experience.
          </DialogDescription>
        </DialogHeader>
        <SpaceForm closeModal={() => setOpen(false)}  edit={edit} spaceid={spaceid} />
      </DialogContent>
    </Dialog>
  );
};
