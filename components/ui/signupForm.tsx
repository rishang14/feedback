"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signupFormSchema } from "@/app/types/schema";
import Loading from "@/app/loading";
import { MultiStepLoader } from "./multi-step-loader";

type formType = z.infer<typeof signupFormSchema>;


const loadingStates = [
  { text: "Fetching Your Detail..." },
  { text: "Sending it to Backends..." },
  { text: "Saving user..." },
  { text: "Sending Verifying email..." },
  { text: "Finalizing setup..." },
];
export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<formType>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: formType) => {
    try {
      setLoading((prev) => !prev);
      const res = await axios.post("/api/auth/signup", {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      console.log(res.data);
      toast.success(` Thankyou for signUp ${data.username}`, {
        duration: 1000,
      }); 
      toast.success("Pls Check your email for verifying it ",{duration:3000})
      // router.push("/signin");
      // setLoading((prev) => !prev);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error response:", error.response.data);
        const errorMessage =
          error.response.data.message || "Something went wrong!";
        toast(errorMessage);
      } else {
        toast("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className=" flex items-center bg-black justify-center w-full min-h-screen">
  //     {loading && (
        <MultiStepLoader
          loadingStates={loadingStates}
          loading={loading}
          duration={1000}
        />
      )}
    </div>

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center"> Signup</CardTitle>
          <CardDescription className="text-center">
            Welcome to Reviewvault
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              {/* Name Field */}
              <FormField
                control={control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Your Name</FormLabel>
                    <FormControl>
                      <Input {...field} id="name" placeholder="John Doe" />
                    </FormControl>
                    <FormMessage>{errors.username?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="@gmail.com"
                      />
                    </FormControl>
                    <FormMessage>{errors.email?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} id="password" type="password" />
                    </FormControl>
                    <FormMessage>{errors.password?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full  bg-neutral-800 text-white"
              >
                Sign Up
              </Button>

              {/* Already have an account? */}
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/signin" className="underline underline-offset-4">
                  Sign In
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
