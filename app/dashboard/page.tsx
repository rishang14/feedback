"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Dashboardcard from "./_comp/dashboardcard";
import DashboardCardWithMenu from "./_comp/dashboadrCard";
import { FolderPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSpace } from "@/store/getSpace";
import Loading from "../loading";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
const Page = () => {
  const { status } = useSession();
  // @ts-ignore
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [open, setopen] = useState(false);
  // @ts-ignore
  const { spaces, getspace } = useSpace();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") router.push("/signin");
  }, [status, router]);
  useEffect(() => {
   async function spaces(){
     await getspace()
   } 
   spaces()
  }, []);

  const CreateSpaceForm = dynamic(
    () => import("@/components/SpaceFormButton"),
    {
      ssr: false,
    }
  );
  if (status === "loading") return <Loading />;

  return (
    <>
      <main className="w-full    md:py-10  flex  items-center justify-center ">
        {/* <div className="absolute bg-zinc-950/30  inset-0 -z-10 md:block hidden bg-[size:4rem_4rem] bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)]"></div> */}
        <div className="container px-4 md:px-6">
          <div className="w-full  max-w-[1080] flex flex-col items-center p-5  md:m-auto ">
            <div className="flex items-center space-x-5 md:flex-row flex-col">
              <div className=" flex items-center">
                <h1 className=" md:text-4xl text-2xl font-bold text-center mb-4  text-white ">
                  Overview :
                </h1>
              </div>
              <div className="flex-1 flex md:flex-row items-center flex-col md:space-x-4 md:space-y-0 space-y-4 p-3">
                <Dashboardcard />
              </div>
            </div>
            <div className="flex items-center md:justify-center space-x-5 flex-col  md:mt-20 ">
              {/* // sapce head section  */}
              <div className="p-5 flex container w-full md:flex-row  flex-col  mx-auto  md:justify-between gap-5">
                <h1 className=" md:text-4xl text-2xl font-bold   text-white ">
                  Active Spaces
                </h1>
                {spaces?.length > 0 && (
                  <Button
                    size={"lg"}
                    onClick={() => setopen(true)}
                    className=" bg-blue-600 flex items-center text-gray-200 justify-center space-x-2 cursor-pointer"
                  >
                    + Create a new Space
                  </Button>
                )}
              </div>
              {/* space body section  */}
              <div className=" container md:min-w-[600px] p-5 mx-auto w-full flex items-center md:justify-start justify-center  md:space-x-8 gap-y-3 flex-wrap  bg-zinc-950/90 rounded-lg border   border-gray-700 shadow-sm">
                {spaces?.length === 0 ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="flex items-center justify-center   ">
                      <div className=" flex flex-col gap-4 items-center">
                        <FolderPlus size={40} color="#fff" />
                        <h2 className="font-bold text-lg text-gray-200">
                          N0 Spaces yet{" "}
                        </h2>
                        <p className="font-medium text-lg text-center text-gray-600 ">
                          {" "}
                          Create your first space to start collecting review .
                        </p>
                         <Button
                    size={"lg"}
                    onClick={() => setopen(true)}
                    className=" bg-blue-600 flex items-center text-gray-200 justify-center space-x-2 cursor-pointer"
                  >
                    + Create a new Space
                  </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {spaces.map((spaces: any, idx: any) => {
                      return (
                        <div
                          key={spaces._id}
                          className="relative p-2 "
                          onMouseEnter={() => setHoveredIndex(idx)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          <AnimatePresence>
                            {hoveredIndex === idx && (
                              <motion.span
                                className="absolute inset-0 h-full w-full bg-slate-800/[0.8] block rounded-lg"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                  opacity: 1,
                                  transition: { duration: 0.15 },
                                }}
                                exit={{
                                  opacity: 0,
                                  transition: { duration: 0.15, delay: 0.2 },
                                }}
                              />
                            )}
                          </AnimatePresence>
                          <DashboardCardWithMenu
                            item={spaces as any}
                            key={spaces._id}
                          />
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <CreateSpaceForm edit={false} open={open} setOpen={setopen} />
    </>
  );
};

export default Page;
