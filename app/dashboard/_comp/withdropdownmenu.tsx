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
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { TrashIcon, Ellipsis, PencilIcon, Link, Settings } from "lucide-react";
import { toast } from "sonner";
import { useSpace } from "@/store/getSpace";

const DropdownMenuDemo = ({ item }: any) => {
  console.log("i am also rendered dropdown");
  const [open, setisopen] = useState({
    editopen: false,
    deleteopen: false,
  });
  // @ts-ignore
  const { copyspaceReviewForm } = useSpace();
  const handleCopyClick = async (spacename: string) => {
    const res = await copyspaceReviewForm(spacename);
    if (res.success) toast.success("Review form is copied", { duration: 3000 });
    else toast.error("Pls try again", { duration: 3000 });
  };
  const handleDialogopen = (newstate: boolean, dialogname: string) => {
    setisopen((prev) => ({
      ...prev,
      [dialogname]: newstate,
    }));
  };

  const EditDialog = dynamic(() => import("@/components/EditspaceDialog"), {
    ssr: false,
  });
  const DeleteDialog = dynamic(() => import("@/components/DeleteSpaceDialog"), {
    ssr: false,
  });
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
              onClick={() => handleDialogopen(true, "editopen")}
            >
              <PencilIcon className="hover:text-black" /> Edit Space Name
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-gray-200"
              onClick={() => handleDialogopen(true, "deleteopen")}
            >
              <TrashIcon color="red" /> Delete Space
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-gray-200"
              onClick={() => handleCopyClick(item.spacename)}
            >
              <Link className="hover:text-black" /> Get Form Link
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
     
        <EditDialog
          isopen={open.editopen}
          onchangeopen={(val: boolean) =>
            setisopen((prev) => ({
              ...prev,
              editopen: val,
            }))
          }
          spaceid={item._id as string}
        />

        <DeleteDialog
          isopen={open.deleteopen}
          onchangeopen={(val: boolean) =>
            setisopen((prev) => ({
              ...prev,
              deleteopen: val,
            }))
          }
          spaceid={item._id as string}
        />

    </>
  );
};

export default React.memo(DropdownMenuDemo);
