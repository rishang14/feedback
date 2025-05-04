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
import { Alert ,AlertDescription} from "./ui/alert"

interface ForgotPasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  email: string
}

const  ForgotPasswordDialog =({ open, onOpenChange, email }: ForgotPasswordDialogProps) =>{
  const [emailInput, setEmailInput] = useState(email)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    // Validate email
    if (!emailInput.trim()) {
      setError("Email is required")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailInput)) {
      setError("Please enter a valid email address")
      return
    }

    // Simulate API call
    setIsLoading(true)

    try {
      // In a real app, you would call your API here
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess(true)

      // Close dialog after a delay
      setTimeout(() => {
        onOpenChange(false)
      }, 3000)
    } catch (err) {
      setError("Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]  bg-neutral-950 border-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-white">Reset Password</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Enter your email address and we'll send you a link to reset your password.
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
              <AlertDescription>Password reset link sent! Check your email inbox.</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter your email address" 
              className="focus-visible:border-blue-600 aria-invalid:border-red-900 focus-visible:ring-blue-300/50   selection:bg-neutral-50 selection:text-neutral-900 border-neutral-800 placeholder:text-neutral-400v text-white " 
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button"   className="bg-blue-500 text-white " variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || success} className="bg-white text-shadow-black" >
              {isLoading ? "Sending..." : success ? "Sent!" : "Send Reset Link"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ForgotPasswordDialog;