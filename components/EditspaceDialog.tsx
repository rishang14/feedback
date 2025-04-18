import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PencilIcon } from "lucide-react";


type prop = {
  isopen: boolean;
  onchangeopen: React.Dispatch<React.SetStateAction<boolean>>;
};
const EditspaceDialog = ({ isopen, onchangeopen }: prop) => {
  return (
    <Dialog open={isopen} >
      <DialogContent className="flex flex-col bg-zinc-950">
        <DialogHeader >
          <DialogTitle className="text-white flex items-center gap-2"><PencilIcon className=" w-4 h-4 "/>  Edit SpaceName</DialogTitle> 
        </DialogHeader> 
          <div className="flex flex-col  gap-4">
            <Input
              id="name"
              placeholder="Enter New Name"
              className="bg-slate-900/10 text-white"
            />
          </div>

        <DialogFooter>
          <Button type="submit" className="bg-blue-500 text-white">Save</Button>  
          <DialogClose asChild>
            <Button className="bg-white text-black" onClick={()=>onchangeopen(false)}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent> 
      
    </Dialog>
  );
};

export default EditspaceDialog;
