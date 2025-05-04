"use client";

import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import {
  MessageCircleCode,  
  MessageSquare,
  Heart,
  Archive,
  AlertTriangle,
  Boxes,
  PencilIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSpaceDetails } from "@/store/spaceDetails";
import { TestimonialCard } from "@/components/testimonial.Card";
import { toast } from "sonner";
import Loading from "@/app/loading";

export default function Page() {
  const [activeSection, setActiveSection] = useState("all");
  const [open, setopen] = useState(false);
  const { spaces } = useParams();
  // @ts-ignore
  const { questions, getSpaceDetails, testimonials } = useSpaceDetails();
  const router = useRouter();
  const { status } = useSession();
  console.log(testimonials, "testimonials");
  useEffect(() => {
    if (spaces) getSpaceDetails(spaces as string);
  }, [spaces]);
  if (status === "loading" || !questions) return <Loading />;
  if (status !== "authenticated") {
    router.push("/signin");
    toast("Pls sign In to access this routes");
    return;
  }

  const sidebarButton = (
    icon: React.ReactNode,
    label: string,
    value: string
  ) => (
    <Button
      variant="sidebutton"
      className={cn(
        `w-full justify-start transition-colors ${
          activeSection === value
            ? "bg-blue-500 text-white hover:bg-blue-500"
            : " text-white"
        }`
      )}
      onClick={() => setActiveSection(value)}
    >
      {icon}
      {label}
    </Button>
  );

  const EditSpaceDialog = dynamic(
    () => import("@/components/SpaceFormButton"),
    {
      ssr: false,
    }
  );
  return (
    <>
      <div className="">
        {/* Header */}
        <header className="border-b">
          <div className="flex h-16 items-center px-4 md:px-6">
            <div className="ml-auto flex items-center space-x-4">
        
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-white" />
                <span className="text-white">Text credits</span>
                <span className="text-muted-foreground">10</span>
              </div>
              <Button
               
                onClick={() => setopen(true)}
                className=" bg-blue-600 flex items-center text-gray-200 justify-center space-x-2 cursor-pointer"
              >
                <PencilIcon /> Edit Space
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="">
          <aside className="w-64 border-r border-white flex flex-col items-center  p-4">
            <h2 className="text-lg font-semibold mb-4 text-white ">Inbox</h2>
            <div className="space-y-2">
              {sidebarButton(
                <MessageCircleCode  className="mr-2 h-4 w-4 text-white" />,
                 "Reviews",
                 "review"
              )}
              {sidebarButton(
                <Heart className="mr-2 h-4 w-4 text-white" />,
                "Liked",
                "liked"
              )}
              {sidebarButton(
                <Archive className="mr-2 h-4 w-4 text-white" />,
                "Archived",
                "archived"
              )}
              
            </div>
  
            <div className="space-y-2">
              <h2 className="text-lg font-semibold mb-4 text-white">
                Embed widgets
              </h2>
              
                {sidebarButton(
                  <Heart className="mr-2 h-4 w-4 text-white" />,
                  "Wall of Love",
                  "wall-of-love"
                )}

            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 p-6   overflow-y-auto ">
            <div className="w-full flex flex-col gap-3 mt-4  ">
              {testimonials.map((item: any) => {
                return (
                  <TestimonialCard
                    key={item._id}
                    name={item?.name as string}
                    email={item?.email as string}
                    description={item?.text as string}
                    avatar=""
                    starred={item?.rating as number}
                  />
                );
              })}
            </div>
          </main>
        </div>
      </div>
      <EditSpaceDialog
        edit={true}
        open={open}
        setOpen={setopen}
        spaceid={spaces && (spaces as string)}
      />
    </>
  );
}
