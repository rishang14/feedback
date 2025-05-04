"use client";
import { useState,useEffect } from "react";
import { cn } from "@/lib/utils"; 
// import axios from "axios"; 
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"; 
import { signIn, } from "next-auth/react"
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


interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  // csrftoken: string;
}
type formType = z.infer<typeof loginSchema>;
export function LoginForm({
  className,
}: LoginFormProps) { 

  const router = useRouter();  
  const {status} =useSession(); 
  // console.log(status); 
  // console.log(data)
  const [loading,setLoading]=useState(false)
  const form = useForm<formType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });  

  useEffect(()=>{
   if(status==="authenticated")router.push("/dashboard")
  },[router,status])

 
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: formType) => {   
    setLoading(true) 
    try { 
      const res=await  signIn("credentials",{ 
        redirect:false,
        email:data.email, 
        password:data.password
      })
      if(res?.error !== null){ 
        console.log(res)
        toast.error('Invalid Credentials or User not exist',{duration:3000})
      } else{
        toast.success("Welcome Again",{duration:2000})
      }
      
    } catch (error) {
      if(error){  
        console.log(error)
        toast.error("Pls try again",{duration:3000})
      }
    }finally{
      setLoading(false)
    }
  };
  
  if(loading) return <Loading/> 

  if(status==="authenticated")return;

  return (
    <div className={cn("flex flex-col gap-6", className)} >
      <Card className="bg-neutral-950 text-neutral-50 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-white">Login</CardTitle>

          <CardDescription className="text-center  text-neutral-400">welcome Back</CardDescription>
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
                        className="bg-neutral-900 focus-visible:border-blue-600 aria-invalid:border-red-900 focus-visible:ring-blue-300/50 selection:bg-neutral-50 selection:text-neutral-900 border-neutral-800 placeholder:text-neutral-400"
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
                      <Input  {...field} id="password" type="password" placeholder="*******" 
                       className="bg-neutral-900 focus-visible:border-blue-600 aria-invalid:border-red-900 focus-visible:ring-blue-300/50 selection:bg-neutral-50 selection:text-neutral-900 border-neutral-800 placeholder:text-neutral-400"/>
                    </FormControl>
                    <FormMessage>{errors.password?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-neutral-800 text-white">
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
