"use client"
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
  } from "@/components/ui/alert-dialog"

type prop = {
  isopen: boolean;
  onchangeopen: React.Dispatch<React.SetStateAction<boolean>>;
  spaceid: string;
};
const DeleteSpaceDialog = ({isopen,onchangeopen,spaceid}:prop) => {
  return (
    <AlertDialog open={isopen}   >
    <AlertDialogContent className=' bg-zinc-950'>
      <AlertDialogHeader>
        <AlertDialogTitle className='text-white '>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription className='text-gray-400'>
          This action cannot be undone. This will permanently delete your
          Space and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className='text-white bg-blue-500  hover:bg-blue-600' onClick={()=>onchangeopen(false)}>Cancel</AlertDialogCancel>
        <AlertDialogAction className='text-white  bg-red-500' onClick={()=>console.log("i am delting")}>Delete Space</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default DeleteSpaceDialog