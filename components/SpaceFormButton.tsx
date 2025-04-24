"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "./ui/dialog"; 
import Spaceform from "./spaceform";
type Props = {
  edit: boolean;
  spaceid?: string; 
  open:boolean,
  setOpen:  React.Dispatch<React.SetStateAction<boolean>>;
};

 const OpenSpaceFormButton = ({ edit,spaceid ,open,setOpen}:Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true}>
      <DialogContent
        className=" flex flex-col p-6 z-1000 min-w-[80%] min-h-screen max-h-screen overflow-y-scroll bg-gradient-to-b from-zinc-50 to-white "
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className=" text-4xl font-bold tracking-tight mb-2 text-center">
            {edit ? " Edit Your Review Form" : " Customize Your Review Form"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-lg text-center">
            Design the perfect Review collection experience.
          </DialogDescription>
        </DialogHeader>
        <Spaceform closeModal={() => setOpen(false)}  edit={edit} spaceid={spaceid} />
      </DialogContent>
    </Dialog>
  );
};

export default OpenSpaceFormButton;