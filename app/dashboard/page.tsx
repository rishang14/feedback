"use client";
import React, { useEffect, useState } from "react";
import Dashboardcard, { DashboardCardWithMenu } from "./_comp/dashboardcard";
import {
  DialogContent,
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FolderPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useGetSpace } from "@/store/getSpace";
import { toast } from "sonner";
import Loading from "../loading";
import { useSession } from "next-auth/react";
import axios from "axios";
const Page = () => {
  const { status, data } = useSession();
  //@ts-ignore
  const { getspace } = useGetSpace();
  const router = useRouter();


  useEffect(() => {
    if (status === "unauthenticated") router.push("/signin");
  }, [status, router]);
  useEffect(() => {
    getspace();
  }, []);

  if (status === "loading") return <Loading />;

  return (
    <div className="w-full mt-20 max-w-[1080] flex flex-col items-center p-5  md:mx-auto ">
      <div className="flex items-center space-x-5 md:flex-row flex-col">
        <div className=" flex items-center">
          <h1 className=" md:text-4xl text-2xl font-bold text-center mb-4  text-white ">
            Overview :
          </h1>
        </div>
        <div className="flex-1 flex md:flex-row items-center flex-col md:space-x-4 md:space-y-0 space-y-4 p-3">
          <Dashboardcard />
          <Dashboardcard />
        </div>
      </div>
      <div className="flex items-center space-x-5 flex-col  mt-20 ">
        {/* // sapce head section  */}
        <div className="p-5 flex items-center md:flex-row flex-col md:w-[935px] w-full  md:justify-between gap-5">
          <h1 className=" md:text-4xl text-2xl font-bold   text-white ">
            Active Spaces
          </h1>
          <CreateSpaceButton />
        </div>
        {/* space body section  */}
        <div className=" md:w-[935px] p-5 mx-auto w-full flex items-center justify-start  space-x-10 gap-y-6 flex-wrap  bg-gray-800 rounded-lg border   border-gray-700 shadow-sm">
          {/* <Emptyspace/> */}
          <DashboardCardWithMenu />
        </div>
      </div>
    </div>
  );
};

export default Page;

const Emptyspace = () => {
  return (
    <div className="flex items-center justify-center   ">
      <div className=" flex flex-col gap-4 items-center">
        <FolderPlus size={40} color="#fff" />
        <h2 className="font-bold text-lg text-gray-200">N0 Spaces yet </h2>
        <p className="font-medium text-lg text-center text-gray-600 ">
          {" "}
          Create your first space to start collecting review .
        </p>
        <CreateSpaceButton />
      </div>
    </div>
  );
};

const CreateSpaceButton = () => {
  const [open, setOpen] = useState(false);

  const SpaceForm = dynamic(() => import("../../components/spaceform"), {
    ssr: false,
  });
  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true}>
      {/* Button to open modal */}
      <DialogTrigger asChild>
        <Button className="text-white bg-blue-600 text-lg cursor-pointer">
          + Create a new Space
        </Button>
      </DialogTrigger>
      <DialogContent
        className=" flex flex-col p-6  min-w-[80%] min-h-screen max-h-screen overflow-y-scroll bg-gradient-to-b from-zinc-50 to-white "
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className=" text-4xl font-bold tracking-tight mb-2 text-center">
            Customize Your Testimonial Form
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-lg text-center">
            Design the perfect testimonial collection experience.
          </DialogDescription>
        </DialogHeader>
        <SpaceForm closeModal={() => setOpen(false)}  edit={false} />
      </DialogContent>
    </Dialog>
  );
};
