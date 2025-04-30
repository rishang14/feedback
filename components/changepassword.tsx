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

interface ChangePasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ChangePasswordDialog=({ open, onOpenChange }: ChangePasswordDialogProps)=> {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    // Validate passwords
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match")
      return
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    // Simulate API call
    setIsLoading(true)

    try {
      // In a real app, you would call your API here
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess(true)

      // Reset form after success
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")

      // Close dialog after a delay
      setTimeout(() => {
        onOpenChange(false)
        setSuccess(false)
      }, 2000)
    } catch (err) {
      setError("Failed to change password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]  bg-neutral-950 border-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-white">Change Password</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Enter your current password and a new password to update your credentials.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Password changed successfully!</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="current-password " className="text-white">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password" 
              className="focus-visible:border-blue-600 aria-invalid:border-red-900 focus-visible:ring-blue-300/50   selection:bg-neutral-50 selection:text-neutral-900 border-neutral-800 placeholder:text-neutral-400v text-white "
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-white">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password" 
              className="focus-visible:border-blue-600 aria-invalid:border-red-900 focus-visible:ring-blue-300/50   selection:bg-neutral-50 selection:text-neutral-900 border-neutral-800 placeholder:text-neutral-400v text-white "
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-white">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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