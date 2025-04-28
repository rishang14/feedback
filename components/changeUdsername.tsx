"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useSession } from "next-auth/react"
import { useProfile } from "@/store/editprofile"
import { usernameSchema } from "@/app/types/schema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {Form, FormField,FormItem,FormControl,FormMessage,FormLabel } from "./ui/form"
import Loading from "@/app/loading"

interface ChangeUsernameDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentUsername: string
  onUsernameChange: (username: string) => void
}

type formType = z.infer<typeof usernameSchema>;

export function ChangeUsernameDialog({
  open,
  onOpenChange,
  currentUsername,
  onUsernameChange,
}: ChangeUsernameDialogProps) {
  const [success,setSuccess]=useState({
    loading:false,
    value:false
  })
  const {data}=useSession();  
  // @ts-ignore
  const {editusername} =useProfile() 

   const form = useForm<formType>({
      resolver: zodResolver(usernameSchema),
      defaultValues: {
        username: "",
      },
    });

    const {
      control,
      handleSubmit,
      formState: { errors },
    } = form;


    const onsubmit=async(value:formType)=>{
      setSuccess((prev)=>({
        ...prev,
        prev:true
       }))
     try { 
      // @ts-ignore
       const res= await editusername(data?.user?.userId,value.username);
       console.log(res)
      
     } catch (error) {
      
     }finally{
      setSuccess((prev)=>({
      ...prev,
      loading:false,
      value:false
     } ) )
    } 
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Username</DialogTitle>
          <DialogDescription>Enter a new username for your account.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
        <form onSubmit={handleSubmit(onsubmit)} className="space-y-4 py-4">
          {errors && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors?.username?.message}</AlertDescription>
            </Alert>
          )}

          {success.value && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Username changed successfully!</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="current-username">Current Username</Label>
            <Input id="current-username" value={currentUsername} disabled />
          </div>

          <div className="space-y-2">
          <FormField
                control={control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Your Name</FormLabel>
                    <FormControl>
                      <Input {...field} id="username" placeholder="John Doe" />
                    </FormControl>
                    <FormMessage>{errors.username?.message}</FormMessage>
                  </FormItem>
                )}
              />

          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={success.loading}>
              {success.loading ? "Updating..." : "Update Username"}
            </Button>
          </DialogFooter>
        </form> 
        </Form>
      </DialogContent>
    </Dialog>
  )
}
