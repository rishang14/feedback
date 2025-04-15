import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import * as z from "zod";
import { Checkbox } from "./ui/checkbox";
import { StarRating } from "@/app/reviewform/[id]/page";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { reviewForm } from "@/app/types/schema";
import { useForm } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { url } from "inspector";

type props = {
  closeModal: () => void;
  spacename: string;
  spacedetail: any;
};

type formProp = z.infer<typeof reviewForm>;

const ReviewForm = ({ closeModal, spacename, spacedetail }: props) => {
  const [open, setOpen] = useState(false);
  const form = useForm<formProp>({
    resolver: zodResolver(reviewForm),
    defaultValues: {
      name: "",
      email: "",
      text: "",
      consent: false,
      rating: 5,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onsubmit = async (data: formProp) => {
    try {
      const res = await axios.post(
        `/api/testimonial/${spacename}`,
        JSON.stringify(data)
      );
      if (res.statusText === "OK") {
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onsubmit)}>
          {spacedetail?.ratingEnabled && (
            <div className="mb-4">
              <FormField
                control={control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <StarRating
                        {...field}
                        // @ts-ignore
                        rating={field?.value}
                        onRatingChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}
          <FormField
            control={control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} id="text" className="min-h-[120px] " />
                </FormControl>
                <FormMessage>{errors.text?.message}</FormMessage>
              </FormItem>
            )}
          />
          <div className="flex flex-col  gap-3 justify-center  ">
            <div className="pt-2 space-y-2 ">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Your Name</FormLabel>
                    <FormControl>
                      <Input {...field} id="name" />
                    </FormControl>
                    <FormMessage>{errors.name?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <div className="pt-2 space-y-2 ">
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Your Email</FormLabel>
                      <FormControl>
                        <Input {...field} id="email" type="email" />
                      </FormControl>
                      <FormMessage>{errors.email?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center mt-4 space-x-2">
            <FormField
              control={control}
              name="consent"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 flex-row-reverse items-center ">
                    <FormLabel className="text-muted-foreground text-sm">
                      {" "}
                      I give permission to use this testimonial across social
                      channels and other marketing efforts
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        id="consent"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormMessage>{errors.consent?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
            <Button
              variant="secondary"
              className="bg-gray-800 hover:bg-gray-900 text-white flex items-center gap-2"
              size="lg"
              type="submit"
            >
              <Send className="h-5 w-5" />
              <span>Send in text</span>
            </Button>
          </div>
        </form>
      </Form>
      <ThankyouModal
        isOpen={open}
        setIsOpen={setOpen}
        spacedetail={spacedetail}
        closeFormmodal={closeModal}
      />
    </>
  );
};

export default ReviewForm;

const ThankyouModal = ({
  isOpen,
  setIsOpen,
  spacedetail,
  closeFormmodal,
}: any) => { 
  const router=useRouter()
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent 
        className="[&>button:last-child]:hidden sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center flex flex-col items-center gap-4">
            {/* <PartyPopper className="h-12 w-12 text-primary" /> */}
            {spacedetail?.thankyouimg && (
              <div className="w-full h-[300px] space-y-4 p-2 rounded-sm">
                <Image
                  src={
                    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjRxcjIxbXJobjVoNzVwempua2twZ2dmbzVjeDZzaDZweHluMnQwaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26gsjCZpPolPr3sBy/giphy.gif"
                  }
                  alt="thankyou"
                  objectPosition="center"
                  className="w-full h-[250px]"
                  width={100}
                  height={100}
                />
              </div>
            )}
            {spacedetail?.thankYouTitle}
          </DialogTitle>
          <DialogDescription className="text-center">
            {spacedetail?.thankYouMessage}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <Button
            onClick={() => {
              setIsOpen(false);
              closeFormmodal(); 
             
            }}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
