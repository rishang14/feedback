"use client"
import React, { useState } from 'react'
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
import { useSpace } from '@/store/getSpace';
import { toast } from 'sonner';

type prop = {
  isopen: boolean;
  onchangeopen: (val:boolean) => void;
  spaceid: string;
}; 

const DeleteSpaceDialog = ({isopen,onchangeopen,spaceid}:prop) => {  
  // @ts-ignore 
 const {deleteSpace,getspace} =useSpace()  
 console.log(isopen,"renderd deletetab")
 const [pending,setpending]=useState(false)
  const handleDelete=async(id: string)=>{ 
    setpending(true);
    try {
        const res= await deleteSpace(id); 
        if(res.success){
          onchangeopen(false); 
          await getspace(); 
           toast.success("Space is deleted",{duration:3000})
         }else{
          toast.error("error while deleting ")
         }
        
      } catch (error) {
        console.log(error)
      }finally{
        setpending(false)
      }
  }
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
        <AlertDialogCancel className='text-white bg-blue-500  hover:bg-blue-600' disabled={pending} onClick={()=>onchangeopen(false)}>Cancel</AlertDialogCancel>
        <AlertDialogAction className='text-white  bg-red-500' disabled={pending} onClick={()=>handleDelete(spaceid)}>{pending ? "Deleting Space" : "Delete Space"}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default React.memo(DeleteSpaceDialog)