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
import { Button } from "./ui/button";

export const OpenSpaceFormButton = ({ edit }: { edit: boolean }) => {
  console.log(edit, "editvalue");
  const [open, setOpen] = useState(false);

  const SpaceForm = dynamic(() => import("./spaceform"), {
    ssr: false,
  });
  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true}>
      {/* Button to open modal */}
      <DialogTrigger asChild>
        <Button className="text-white bg-blue-600 text-lg cursor-pointer">
          {edit ? " Edit Space" : "+ Create a new Space"}
        </Button>
      </DialogTrigger>
      <DialogContent
        className=" flex flex-col p-6  min-w-[80%] min-h-screen max-h-screen overflow-y-scroll bg-gradient-to-b from-zinc-50 to-white "
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
        <SpaceForm closeModal={() => setOpen(false)} edit={edit} />
      </DialogContent>
    </Dialog>
  );
};
