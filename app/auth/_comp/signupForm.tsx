"use client"

import { zodResolver } from "@hookform/resolvers/zod"; 

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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
// import { Label } from "@/components/ui/label"; 
import { signupFormSchema } from "@/app/zod/schema";


type formType = z.infer<typeof signupFormSchema>; 


export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) { 
  
  const form = useForm<formType>({
    resolver: zodResolver(signupFormSchema),
    defaultValues:{
      username:"john doe", 
      email:"@gmail.com"
    },
  }); 
 
  const {control, handleSubmit, formState: { errors }} =form

  const onSubmit=async(data:formType)=>{
   try {
    const res= await axios.post("/api/auth/signup",{
      username:data.username, 
      email:data.email, 
      password:data.password
     }) 
   
     console.log( res.data ) 
    
   } catch (error) {
     console.log(error)
   }
  }

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
    
        <Form {...form} >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              
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
                      <Input {...field} id="email" type="email" placeholder="@gmail.com" />
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
              <Button type="submit" className="w-full">Sign Up</Button>

              {/* Already have an account? */}
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/signin" className="underline underline-offset-4">
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
