"use client";
import React from "react";
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
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetSpace } from "@/store/getSpace";
import { any } from "zod";
// import { useSpaceDetails } from "@/store/spaceDetails";

const Dashboardcard = () => {
  return (
    <Card className='bg-gray-800 overflow-hidden rounded-lg border border-gray-700 shadow-sm" '>
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

export const DashboardCardWithMenu = ( {item}:{item:any} ) => {
  // @ts-ignore
  console.log(item,"item")
  // @ts-ignore
  // const { getSpaceDetails } = useSpaceDetails();
  const router = useRouter();
  const handleClick = async (spaces: any) => {
    router.push(`/dashboard/space/${spaces}`);
  };
  return (
    <Card className="bg-gray-800 overflow-hidden rounded-lg border border-gray-700 shadow-sm">
      <CardContent className="max-w-[250px] flex justify-between items-center ">
        <div className="w-[200px]  flex justify-between  ">
            <p
              className="text-white text-xl font-medium "
              onClick={() => handleClick(item._id)}
            >
              {" "}
              {item.spacename}
            </p>
        </div>
      </CardContent>
      <CardDescription></CardDescription>
    </Card>
  );
};

const DropdownMenuDemo = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-gray-800 border-none hover:bg-gray-400 cursor-pointer"
          size="icon"
        >
          <Ellipsis size={40} color="#fff" strokeWidth={0.75} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-5 bg-gray-100">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            Edit Space
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer ">
            Delete Space
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
