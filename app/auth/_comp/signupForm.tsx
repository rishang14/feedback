 import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"; 
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
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from "@/components/ui/label"; 
import { signupFormSchema } from "@/app/zod/schema";


type formType = z.infer<typeof signupFormSchema>; 


export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) { 
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(signupFormSchema),
  }); 


  const onSubmit=(data:formType)=>{
    console.log("data",data)
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Enter Your Name</Label>
                <Input id="name" type="name" placeholder="john doe" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Sign-Up
              </Button>
              <Button variant="outline" className="w-full">
                sign-Up with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link
                href={"/auth/signin"}
                className="underline underline-offset-4"
              >
                Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
