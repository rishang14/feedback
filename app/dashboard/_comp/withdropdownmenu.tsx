"use client";
import React, { useState } from "react";
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
import EditspaceDialog from "@/components/EditspaceDialog";
import { toast } from "sonner";
import DeleteSpaceDialog from "@/components/DeleteSpaceDialog";

const DropdownMenuDemo = ({ item }: any) => {
  const [editopen, setEditIsOpen] = useState(false);
  const [deleteopen, setDelteIsOpen] = useState(false);
  const handleCopyClick = async () => {
    const url = "http://localhost:3000/reviewform/";
    try {
      await navigator.clipboard.writeText(`${url}${item.spacename}`);
      toast.success("Review Form Link copied successfully");
    } catch (error) {
      toast("Error while Copying");
    }
  };
  const handleDialogopen = (newstate: boolean) => {
    setEditIsOpen(newstate);
  };
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className=" border-none hover:bg-gray-400 cursor-pointer"
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
              onClick={() => handleDialogopen(true)}
            >
              <PencilIcon className="hover:text-black" /> Edit Space Name
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-gray-200" 
            onClick={()=>setDelteIsOpen(true)}
            >
              <TrashIcon color="red" /> Delete Space
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-gray-200"
              onClick={handleCopyClick}
            >
              <Link className="hover:text-black" /> Get Form Link
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditspaceDialog
        isopen={editopen}
        onchangeopen={setEditIsOpen}
        spaceid={item._id as string}
      />
      <DeleteSpaceDialog
        isopen={deleteopen}
        onchangeopen={setDelteIsOpen}
        spaceid={item._id as string}
      />
    </>
  );
};

export default DropdownMenuDemo;
