import React from 'react' 
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
import { TrashIcon, Ellipsis,Archive,  Link, Settings,Heart ,Tags} from "lucide-react";
 type prop ={
    id:string,
    tags?:Array<string>
 }
const DropDownForTestimonial = ({id,tags}:prop) => {
  return (
   <> 
    <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className=" border-none  cursor-pointer"
            size="icon"
          >
            <Ellipsis size={40} color="#fff" strokeWidth={0.75} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col bg-neutral-950">
          <DropdownMenuLabel className="text-white flex gap-2 items-center">
            <Settings className="h-4 w-4" /> Settings
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup> 
            <DropdownMenuItem
              className="cursor-pointer text-gray-200 hover:bg-black"
            >
              <Archive  className="hover:text-black" /> Archive
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-gray-200"
            >
              <Tags className="hover:text-black" /> Manage Tag
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
   </>
  )
}

export default DropDownForTestimonial