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
              className="cursor-pointer text-gray-200"
            //   onClick={() => handleCopyClick(item.spacename)}
            >
              <Heart  className="text-red-800  " />Like
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-gray-200 hover:bg-black"
            //   onClick={() => handleDialogopen(true)}
            >
              <Archive  className="hover:text-black" /> Archive
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-gray-200"
            //   onClick={() => setDelteIsOpen(true)}
            >
              <TrashIcon color="red" /> Delete 
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-gray-200"
            //   onClick={() => handleCopyClick(item.spacename)}
            >
              <Tags className="hover:text-black" /> Add Tag
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
   </>
  )
}

export default DropDownForTestimonial