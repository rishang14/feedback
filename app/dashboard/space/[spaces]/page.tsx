"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import {
  MessageSquare,
  PencilIcon,
} from "lucide-react";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSpaceDetails } from "@/store/spaceDetails";
import { toast } from "sonner";
import Loading from "@/app/loading";
import { AppSidebar } from "@/components/sidebarmenu";
import Reviews from "@/components/reviewcomp";
import { testimonialSchema } from "@/app/types/schema";

type  Review =z.infer<typeof testimonialSchema>;
export default function Page() {
  const [open, setopen] = useState({
    editspace: false,
    tagmanager: false,
  });  
  const query= useSearchParams(); 
  const pathname= usePathname() ; 
  const activetab= query.get("tab") ?? "review";
  const [activeSection, setActiveSection] = useState(activetab);
  const { spaces } = useParams();
  // @ts-ignore
  const {  getSpaceDetails, testimonials ,tags,getreviews} = useSpaceDetails();
  const router = useRouter();
  const { status } = useSession(); 
  console.log(query.get("tab"),"tab");
  useEffect(() => {
    async function spaceDetails(){
      if (spaces) await getSpaceDetails(spaces as string);
    } 
     spaceDetails() 
  }, [spaces]);  
   
   
useEffect(() => {
  const fetchReviews = async () => {
    const tab = query.get("tab") ?? "review";
    try {
      const res = await getreviews(spaces as string, tab);
    } catch (error) {
      console.error("Error fetching reviews", error);
      // setReviews([]);
    }
  };

  if (spaces) fetchReviews();
}, [spaces, query]);
  
const updateTabAndPathname = useCallback(
  (val: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", val);

    router.replace(`${pathname}?${params.toString()}`); 
    setActiveSection(val)
  },
  [ pathname, router] 
);

  if (status === "loading" ) return <Loading />;
  if (status !== "authenticated") {
    router.push("/signin");
    toast("Pls sign In to access this routes");
    return;
  }

  const EditSpaceDialog = dynamic(
    () => import("@/components/SpaceFormButton"),
    {
      ssr: false,
    }
  );
  const TagManager = dynamic(() => import("@/components/manageTags"), {
    ssr: false,
  });


  return (
    <>
      <SidebarProvider>
        <AppSidebar
          activeSection={activeSection}
          setActiveSection={updateTabAndPathname}
          tagopen={(val: boolean) =>
            setopen((prev) => ({ ...prev, tagmanager: val }))
          }
        />
        <main className="flex  flex-col w-full ">
          <header className="border-b border-zinc-800">
            <div className="flex h-16 items-center px-4 md:px-6">
              <SidebarTrigger className="h-10 w-10 text-white hover:text-white bg-zinc-800 hover:bg-zinc-800 rounded-md mr-2 " />
              <div className="ml-auto flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-white" />
                  <span className="text-white">Text credits</span>
                  <span className="text-zinc-400">10</span>
                </div>
                <Button
                  onClick={() =>
                    setopen((prev) => ({
                      ...prev,
                      editspace: true,
                    }))
                  }
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-gray-200"
                >
                  <PencilIcon className="h-4 w-4" />
                  <span>Edit Space</span>
                </Button>
              </div>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto bg-zinc-950 p-6">  
            {/* @ts-ignore */}
            <div className="w-full space-y-4">
              {activeSection === "review" && (
                <Reviews testimonials={testimonials ?? [] } tags={tags} spaceid={spaces as string} tab="Review"/>
              )}
              {activeSection === "liked" && (
                <Reviews testimonials={testimonials ?? [] } tags={tags} spaceid={spaces as string} tab="Liked"/>
              )}
              {activeSection === "archeived" && (
                 <Reviews testimonials={testimonials ?? [] } tags={tags} spaceid={spaces as string} tab="Archeived"/>
              )}
              {/* {activeSection === "wall-of-love" && (
                <div className="text-center py-10">
                  <h2 className="text-xl font-bold text-white mb-2">
                    Wall of Love
                  </h2>
                  <p className="text-zinc-400">Your wall of love is empty</p>
                </div>
              )} */}
            </div>
          </div>
        </main>
      </SidebarProvider>
      <EditSpaceDialog
        edit={true}
        open={open.editspace}
        setOpen={(val) =>
          setopen((prev) => ({
            ...prev,
            editspace: val,
          }))
        }
        spaceid={spaces as string}
      />
      <TagManager
        onchangeopen={(val) =>
          setopen((prev) => ({
            ...prev,
            tagmanager: val,
          }))
        }
        open={open.tagmanager}
        tags={tags} 
        spaceid={spaces as string}
      />
    </>
  );
}
