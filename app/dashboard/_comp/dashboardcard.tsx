"use client";
import React from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { useSpace } from "@/store/getSpace";


const Dashboardcard = () => { 
  // @ts-ignore
  const {spaces} =useSpace();
  return (
    <Card className='bg-zinc-950/50 overflow-hidden rounded-lg border border-gray-500/70 shadow-sm" '>
      <CardContent className=" ">
        <div className="flex justify-between  md:w-[280px]">
          <p className="text-white text-xl font-medium "> Total spaces:</p>
          <span className="text-white text-xl font-medium">{spaces.length ?? 0}</span>
        </div>
      </CardContent>
    </Card>
  );
};
export default Dashboardcard;

 