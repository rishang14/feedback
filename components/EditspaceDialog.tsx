"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "@/components/ui/input";
import { PencilIcon } from "lucide-react";
import { useSpace } from "@/store/getSpace";
import { SpaceNameEditSchema } from "@/app/types/schema";
import { useForm } from "react-hook-form";

type prop = {
  isopen: boolean;
  onchangeopen: React.Dispatch<React.SetStateAction<boolean>>;
  spaceid: string;
}; 
 
type spacemanetype= z.infer<typeof SpaceNameEditSchema>
const EditspaceDialog = ({ isopen, onchangeopen, spaceid }: prop) => {
  //  @ts-ignore
  const { editSpaceName } = useSpace();
  const [spacename, setspaceName] = useState<string>("");
   const form = useForm<spacemanetype>({
     resolver: zodResolver(SpaceNameEditSchema),
     defaultValues: {
       spacename:""
     },
   }); 
   const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const onSubmit = (data:spacemanetype) => {
    console.log(spacename, "values");
  };
  return (
    <Dialog open={isopen}>
      <DialogContent className="flex flex-col bg-zinc-950">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <PencilIcon className=" w-4 h-4 " /> Edit SpaceName
          </DialogTitle>
        </DialogHeader> 
        <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col  gap-4">
            <Input
              id="name"
              value={spacename}
              onChange={(e) => setspaceName(e.target.value)}
              placeholder="Enter New Name"
              className="bg-slate-900/10 text-white"
            />
            <div className="w-full items-center flex justify-end gap-4">
              <Button type="submit" className="bg-blue-500 text-white">
                Save
              </Button>
              <DialogClose asChild>
                <Button
                  className="bg-white text-black"
                  onClick={() => onchangeopen(false)}
                >
                  Close
                </Button>
              </DialogClose>
            </div>
          </div>
        </form> 
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditspaceDialog;
