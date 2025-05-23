"use client"
import React, { useEffect }   from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import axios from "axios";
import { toast } from "sonner";

type prop = {
  isopen: boolean;
  onchangeopen: (val:boolean) => void;
  spaceid: string;
};

type spacemanetype = z.infer<typeof SpaceNameEditSchema>;
const EditspaceDialog = ({ isopen, onchangeopen, spaceid }: prop) => {
  //  @ts-ignore
  const { getspace } = useSpace(); 
  console.log(isopen,"rendered")
  const form = useForm<spacemanetype>({
    resolver: zodResolver(SpaceNameEditSchema),
    defaultValues: {
      spacename: "",
    },
  });
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = form; 


  useEffect(()=>{
    if (!isopen) {
      reset();
    }
  },[isopen,reset])
  const onSubmit = async (data: spacemanetype) => {
    try {
      const { spacename } = data;
      const res = await axios.patch(
        `/api/editspace/spacename/${spaceid}/edit`,
        JSON.stringify({ spacename: spacename }),
        { withCredentials: true }
      );
      onchangeopen(false);
      reset();
      toast.success("SpaceName Updated", { duration: 3000 });
      await getspace()
    } catch (error) {
      // @ts-ignore
      if (error.status === 409) {
        setError("spacename", {
          type: "server",
          // @ts-ignore
          message: error?.response?.data?.error || "Something went wrong",
        });
      } else {
        toast.error("Something went wrong Pls try again");
        reset();
        onchangeopen(false);
      }
    }
  };
  return (
    <Dialog open={isopen} onOpenChange={onchangeopen}>
      <DialogContent className="flex flex-col bg-zinc-950">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <PencilIcon className=" w-4 h-4 " /> Edit SpaceName
          </DialogTitle> 
          <DialogDescription className="text-neutral-400"> Edit Your Space name Here</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col  gap-4">
              <FormField
                control={control}
                name="spacename"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        id="spacename"
                        className="bg-slate-900/10 text-white"
                        placeholder="Enter New Space name"
                      />
                    </FormControl>
                    <FormMessage>{errors.spacename?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <div className="w-full items-center flex justify-end gap-4">
                <Button
                  type="submit"
                  className="bg-blue-500 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? " Saving..." : "Save"}
                </Button>
                <DialogClose asChild>
                  <Button 
                  type="button"
                    className="bg-white text-black"
                    onClick={() => {
                      onchangeopen(false);
                      reset();
                    }}
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

export default React.memo(EditspaceDialog);
