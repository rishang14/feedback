"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Copy, ArrowLeft, CheckCircle2 } from "lucide-react"; 
import { cn } from "@/lib/utils";
import Image from "next/image";

type prop = {
  embedopen: boolean;
  setembedopen: (val: boolean) => void;
  sid:string,
};

const img= [
  {
    imgsrc:"/one.png",
    alt:"one", 
    text:"Animated"
  },
  {
    imgsrc:"/two.png",
    alt:"two",
    text:"Masonry"
  } ,{
    imgsrc:"/three.png",
    alt:"three",
    text:"Basic"
  }

]


const Embedhome = ({ embedopen, setembedopen,sid }: prop) => {
  const [step, setStep] = useState<1 | 2 | null>(null);
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);
  const [copied, setCopied] = useState(false); 
  const [style,setstyle]=useState("one")

 
  const copyCode = () => {
    const codeSnippet = document.getElementById("embed-code")?.textContent;
    if (codeSnippet) {
      navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  const Link=`https://feedbackvault.vercel.app/embedreview?sid=${sid}&style=${style}`
  const embedCode = `<iframe height="800px" id=${sid} src=${Link}></iframe>`;

  return (
    <>
      <Dialog open={embedopen} onOpenChange={setembedopen} modal={true}>
        <DialogContent className="flex flex-col  max-h-[90%] overflow-y-auto md:min-w-[900px] ">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-white text-center">
              Embed a Wall of Love
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center justify-center mb-6">
              <span className="ml-3 text-xl text-white">Choose a layout</span>
            </div>
            <div className=" flex gap-2 justify-center  p-3">
              {
                img.map((item:any)=>{
                  return <Card
                className="  transition-all  cursor-pointer  " 
                key={item.alt} 
                onClick={()=>setstyle(item.alt)}
              >
                <CardContent className="p-4 border-blue-400 flex-col  flex gap-3  min-w-[200px] min-h-[200px] "> 
                  <div className="w-[200px] h-[195px] "> 
                    <Image src={item.imgsrc} alt={item.alt} width={100} height={100}  className="object-cover w-full h-full"/>

                  </div>
                  <p className="text-center text-shadow-gray-400 font-medium text-lg">{item.text}</p>
                </CardContent>
              </Card>
                })
              }
            </div>
          </div>
         
          <DialogFooter className="flex gap-2 items-center"> 
             <div className="bg-muted p-4 flex flex-wrap break-words w-full rounded-md ">
            <code className="text-blue-600">{embedCode}</code>
          </div>
            <Button onClick={copyCode} className="flex items-center gap-2">
              {copied ? "Copied!" : "Copy Code"}
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default React.memo(Embedhome);
