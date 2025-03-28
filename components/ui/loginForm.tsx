"use client";
import { useState,useEffect } from "react";
import { cn } from "@/lib/utils"; 
import axios from "axios";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"; 
import { signIn,getCsrfToken } from "next-auth/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { loginSchema } from "@/app/types/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Loading from "@/app/loading";
import { toast } from "sonner";
import { sign } from "crypto";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  // csrftoken: string;
}
type formType = z.infer<typeof loginSchema>;
export function LoginForm({
  className,
  // csrftoken
}: LoginFormProps) { 

  // const [csrfToken, setCsrfToken] = useState("");

  // useEffect(() => {
  //   async function fetchToken() {
  //     const token = await getCsrfToken();
  //     setCsrfToken(token || ""); // Avoid undefined values
  //   }
  //   fetchToken();
  // }, []);
  const router = useRouter(); 
  const [loading,setloading]=useState(false)
  const form = useForm<formType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: formType) => {   
    try {
      // const res  = await axios.post("/api/auth/callback/credentials", {
      //   csrfToken, // ✅ Include CSRF Token
      //   email:data.email,
      //   password: data.password, 
      //   }) 
      const res=await  signIn("credentials",{ 
        redirect:false,
        email:data.email, 
        password:data.password
      })
      console.log(res);
    } catch (error) {
      console.log(error);  
    }
  };
  
  if(loading) return <Loading/>

  return (
    <div className={cn("flex flex-col gap-6", className)} >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>welcome Back</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            > 
            {/* <input type="hidden" name="csrfToken" value={csrfToken} /> */}
              {/* Name Field */}
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
                      <Input  {...field} id="password" type="password" />
                    </FormControl>
                    <FormMessage>{errors.password?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Sign in
              </Button>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href={"/signup"}
                  className="underline underline-offset-4"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
