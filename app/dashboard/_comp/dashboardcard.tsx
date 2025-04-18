"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TrashIcon, Ellipsis, PencilIcon, Link, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import EditspaceDialog from "@/components/EditspaceDialog";
import { Item } from "@radix-ui/react-dropdown-menu";

const Dashboardcard = () => {
  return (
    <Card className='bg-zinc-950/50 overflow-hidden rounded-lg border border-gray-500/70 shadow-sm" '>
      <CardContent className=" ">
        <div className="flex justify-between  md:w-[280px]">
          <p className="text-white text-xl font-medium "> Hello</p>
          <span className="text-white text-xl font-medium">icon</span>
        </div>
      </CardContent>
      <CardDescription></CardDescription>
    </Card>
  );
};
export default Dashboardcard;

export const DashboardCardWithMenu = ({ item }: { item: any }) => {
  // @ts-ignore
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // @ts-ignore
  // const { getSpaceDetails } = useSpaceDetails();
  const router = useRouter();
  const handleClick = async (spaces: any) => {
    router.push(`/dashboard/space/${spaces}`);
  };
  return (
    <div
      key={item._id}
      className=" relative p-2 "
      onMouseEnter={() => setHoveredIndex(item._id)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <AnimatePresence>
        {hoveredIndex === item._id && (
          <motion.span
            className="absolute inset-0 h-full w-full bg-slate-800/[0.8] block rounded-lg"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.15 },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
      <Card className="bg-zinc-950/50 overflow-hidden relative group    rounded-lg border border-gray-500/70 shadow-sm">
        <CardContent className="max-w-[250px] flex justify-between items-center ">
          <div className="w-[200px]  flex justify-between ">
            <p
              className="text-white hover:text-gray-200/90 text-xl font-medium underline cursor-pointer"
              onClick={() => handleClick(item._id)}
            >
              {" "}
              {item.spacename}
            </p>
            <DropdownMenuDemo  id={item._id as string}/>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const DropdownMenuDemo = ({id}:{id:string}) => { 
  const [open,setIsOpen]=useState(false)
  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className=" border-none hover:bg-gray-400 cursor-pointer"
          size="icon"
        >
          <Ellipsis size={40} color="#fff" strokeWidth={0.75} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col bg-neutral-950" >
        <DropdownMenuLabel className="text-white flex gap-2 items-center">
          <Settings className="h-4 w-4" /> Settings
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer text-gray-200 hover:bg-black" onClick={()=>setIsOpen(true)}>
                <PencilIcon className="hover:text-black" /> Edit Space Name
              </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-gray-200">
            <TrashIcon color="red" /> Delete Space
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-gray-200">
            <Link className="hover:text-black" /> Get Form Link
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>  
    <EditspaceDialog isopen={open} onchangeopen={setIsOpen} spaceid={id}/>
    </>
  );
};
