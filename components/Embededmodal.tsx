"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Copy, ArrowLeft, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
 
type prop={
    embedopen:boolean, 
    setembedopen:(val:boolean)=> void
}

const  Embedhome=({embedopen, setembedopen}:prop)=> {
  const [step, setStep] = useState<1 | 2 | null>(null)
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const openFirstModal = () => {
    setStep(1) 
    setembedopen(true)
  }

  const selectLayout = (layout: string) => {
    setSelectedLayout(layout)
    setStep(2)
  }

  const closeModal = () => {
    setStep(null) 
    setembedopen(false)
  }

  const copyCode = () => {
    const codeSnippet = document.getElementById("embed-code")?.textContent
    if (codeSnippet) {
      navigator.clipboard.writeText(codeSnippet)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const embedCode = `<iframe height="800px" id="testimonialto-header-tag-all-light-animated" src="https://embed-v2.testimonial.to/w/header-tag-all-light-animated"></iframe>`

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
    
      <Dialog open={embedopen} onOpenChange={() => step === 1 && closeModal()}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center">Embed a Wall of Love</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center justify-center mb-6">
              <Badge variant="outline" className="bg-primary/10 text-primary font-medium px-4 py-1">
                Step 1
              </Badge>
              <span className="ml-3 text-xl">Choose a layout</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card
                className={cn(
                  "cursor-pointer border-2 hover:border-primary transition-all",
                  selectedLayout === "masonry-animated" && "border-primary",
                )}
                onClick={() => selectLayout("masonry-animated")}
              >
                <CardContent className="p-4">
                  <div className="aspect-square bg-muted mb-4 flex items-center justify-center overflow-hidden rounded-md">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-30%20204444-4Y63WyeORYFeGpu62rekJbfkhatATN.png"
                      alt="Masonry animated layout"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-center font-medium text-lg">Masonry - animated</p>
                </CardContent>
              </Card>

              <Card
                className={cn(
                  "cursor-pointer border-2 hover:border-primary transition-all",
                  selectedLayout === "masonry-fixed" && "border-primary",
                )}
                onClick={() => selectLayout("masonry-fixed")}
              >
                <CardContent className="p-4">
                  <div className="aspect-square bg-muted mb-4 flex items-center justify-center overflow-hidden rounded-md">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-30%20204444-4Y63WyeORYFeGpu62rekJbfkhatATN.png"
                      alt="Masonry fixed layout"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-center font-medium text-lg">Masonry - fixed</p>
                </CardContent>
              </Card>

              <Card
                className={cn(
                  "cursor-pointer border-2 hover:border-primary transition-all",
                  selectedLayout === "carousel" && "border-primary",
                )}
                onClick={() => selectLayout("carousel")}
              >
                <CardContent className="p-4">
                  <div className="aspect-square bg-muted mb-4 flex items-center justify-center overflow-hidden rounded-md">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-30%20204444-4Y63WyeORYFeGpu62rekJbfkhatATN.png"
                      alt="Carousel slider layout"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-center font-medium text-lg">Carousel slider</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 text-center text-muted-foreground">
              Check out our{" "}
              <a href="#" className="text-primary underline hover:text-primary/80">
                Wall of Love embed guide
              </a>{" "}
              for more help.
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Second Modal - Customization */}
      <Dialog open={step === 2} onOpenChange={() => step === 2 && closeModal()}>
        <DialogContent className="max-w-4xl">
          <div className="absolute top-4 left-4">
            <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center">Embed a Wall of Love</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center justify-center mb-6">
              <Badge variant="outline" className="bg-primary/10 text-primary font-medium px-4 py-1">
                Step 2
              </Badge>
              <span className="ml-3 text-xl">Customize your Wall of Love</span>
            </div>

            <div className="mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-green-500 h-5 w-5" />
              <span className="text-lg">
                {selectedLayout === "masonry-animated"
                  ? "Masonry - animated"
                  : selectedLayout === "masonry-fixed"
                    ? "Masonry - fixed"
                    : "Carousel slider"}
              </span>
            </div>

            <div className="bg-muted p-4 rounded-md mb-4 overflow-x-auto">
              <pre className="text-sm" id="embed-code">
                <code className="text-blue-600">{embedCode}</code>
              </pre>
            </div>

            <div className="text-muted-foreground mb-6">
              Height is set to 800px by default. You can change the height parameter to what you like.
            </div>

            <DialogFooter>
              <Button onClick={copyCode} className="flex items-center gap-2">
                {copied ? "Copied!" : "Copy Code"}
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 


export default React.memo(Embedhome)