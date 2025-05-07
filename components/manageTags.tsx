"use client";

import { useState } from "react";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "./ui/form";
import { TagsIcon, Trash2 } from "lucide-react";
import { Label } from "./ui/label";
import { TagSchema } from "@/app/types/schema";
import { useSpaceDetails } from "@/store/spaceDetails";
import { toast } from "sonner";
import { getspacesWthUserId } from "@/lib/helper";

type prop = {
  open: boolean;
  onchangeopen: (open: boolean) => void;
  tags: Array<string>;
  spaceid: string;
};

type tagSchema = z.infer<typeof TagSchema>;
export default function TagManager({
  open,
  onchangeopen,
  tags,
  spaceid,
}: prop) {
  const [loading, setLoading] = useState(false);

  // @ts-ignore
  const { addtag, getSpaceDetails, removeTag } = useSpaceDetails();
  console.log(spaceid, "id");
  const form = useForm<tagSchema>({
    resolver: zodResolver(TagSchema),
    defaultValues: {
      tag: "",
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  const onsubmit = async (data: tagSchema) => {
    setLoading(true);
    try {
      const { tag } = data;
      const res = await addtag(spaceid, tag);
      if (res.success) {
        toast.success("Tag is Created ", { duration: 3000 });
        await getSpaceDetails(spaceid as string);
      }  
      if(!res.success  && res.status === 402){ 
        console.log(res?.error)
        setError("tag",{
          type: "server",
          message: res?.error || "Something went wrong",
        })
      }
      console.log(res,"res")
    } catch (error: any) { 
      console.log(error,"err")
    } finally {
      setLoading(false);
    }
  };

  const handleTagDelete = async (tag: string) => {
    setLoading(true);
    try {
      const res = await removeTag(spaceid, tag as string);
      if (res.success) {
        toast.success("Deleted Success fulluy");
        await getSpaceDetails(spaceid as string);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onchangeopen}>
      <DialogContent className="flex flex-col ">
        <DialogHeader>
          <DialogTitle className="text-white">Manage tags </DialogTitle>
          <DialogDescription>You can create and delete tags</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Form {...form}>
            <form onSubmit={handleSubmit(onsubmit)}>
              <div className="flex gap-2 items-center   w-full">
                <FormField
                  control={control}
                  name="tag"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-white">
                        Create New Tag
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="tag"
                          placeholder="Enter Tag Name"
                          className="text-white "
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage className="text-neutral-400">
                        {errors.tag?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <Button
                  variant={"outline"}
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-600 mt-4 text-white"
                >
                  {loading ? "Creating" : "Create"}
                </Button>
              </div>
            </form>
          </Form>
          <div className="bg-muted-background rounded-md p-4">
            <div className="font-medium mb-2 text-foreground">Manage Tags</div>

            {tags?.map((tag) => (
              <div
                key={tag}
                className="flex items-center justify-between py-2 "
              >
                <p className="text-white">{tag}</p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-neutral-400"
                    onClick={() => handleTagDelete(tag)}
                    disabled={loading}
                  >
                    {loading ? (
                      "..."
                    ) : (
                      <Trash2 className="h-4 w-4 text-neutral-400" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
            {tags?.length === 0 && (
              <div className="text-sm text-center flex items-center justify-center gap-2 text-muted-foreground py-2">
                <TagsIcon className="w-4 h-4" /> Oops!! Tags is empty
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
