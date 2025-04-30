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

interface ChangePasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ChangePasswordDialog=({ open, onOpenChange }: ChangePasswordDialogProps)=> {
  const [isLoading, setIsLoading] = useState(false)



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]  bg-neutral-950 border-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-white">Change Password</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Enter your current password and a new password to update your credentials.
          </DialogDescription>
        </DialogHeader>

        <form  className="space-y-4 py-4">
        
          <div className="space-y-2">
            <Label htmlFor="current-password " className="text-white">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              placeholder="Enter current password" 
              className="focus-visible:border-blue-600 aria-invalid:border-red-900 focus-visible:ring-blue-300/50   selection:bg-neutral-50 selection:text-neutral-900 border-neutral-800 placeholder:text-neutral-400v text-white "
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-white">New Password</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="Enter new password" 
              className="focus-visible:border-blue-600 aria-invalid:border-red-900 focus-visible:ring-blue-300/50   selection:bg-neutral-50 selection:text-neutral-900 border-neutral-800 placeholder:text-neutral-400v text-white "
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-white">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm new password"
              className="focus-visible:border-blue-600 aria-invalid:border-red-900 focus-visible:ring-blue-300/50   selection:bg-neutral-50 selection:text-neutral-900 border-neutral-800 placeholder:text-neutral-400v text-white "
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" className="bg-blue-500 text-white " onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}  className="bg-white text-shadow-black" >
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ChangePasswordDialog;