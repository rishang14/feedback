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
  Tags,
  PencilIcon,
} from "lucide-react"; 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
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
  const [activeSection, setActiveSection] = useState("review");
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

  const EditSpaceDialog = dynamic(
    () => import("@/components/SpaceFormButton"),
    {
      ssr: false,
    }
  );
  return (
    <>
        <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-zinc-950">
        {/* Header */}
        <header className="border-b border-zinc-800">
          <div className="flex h-16 items-center px-4 md:px-6">
            <SidebarTrigger className="h-10 w-10 text-white bg-zinc-800 rounded-md mr-2 " />
            <div className="ml-auto flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-white" />
                <span className="text-white">Text credits</span>
                <span className="text-zinc-400">10</span>
              </div>
              <Button
                onClick={() => setopen(true)}
                className="flex items-center justify-center space-x-2 bg-blue-600 text-gray-200"
              >
                <PencilIcon className="h-4 w-4" />
                <span>Edit Space</span>
              </Button>
            </div>
          </div>
        </header>

        <div className="flex flex-1  bg-blue-600">
          {/* Sidebar */}
          <Sidebar className="border-r border-zinc-800">
            <SidebarHeader>
              <h2 className="px-4 text-lg font-semibold text-nuetral-900">Inbox</h2>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeSection === "review"}
                        onClick={() => setActiveSection("review")}
                      >
                        <MessageCircleCode className="h-4 w-4" />
                        <span>Reviews</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive={activeSection === "liked"} onClick={() => setActiveSection("liked")}>
                        <Heart className="h-4 w-4" />
                        <span>Liked</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeSection === "archived"}
                        onClick={() => setActiveSection("archived")}
                      >
                        <Archive className="h-4 w-4" />
                        <span>Archived</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeSection === "wall-of-love"}
                        onClick={() => setActiveSection("wall-of-love")}
                      >
                        <Heart className="h-4 w-4" />
                        <span>Wall of Love</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeSection === "create-tags"}
                        onClick={() => setActiveSection("create-tags")}
                      >
                        <Tags className="h-4 w-4" />
                        <span>Create Tags</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-zinc-950 p-6">
            <div className="w-full space-y-4">
              {activeSection === "review" && (
                <> 
               <h2 className="text-xl font-bold text-white mb-4">Reviews</h2>
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
              </>
              )}
              {activeSection === "liked" && (
                <div className="text-center py-10">
                  <h2 className="text-xl font-bold text-white mb-2">Liked Reviews</h2>
                  <p className="text-zinc-400">No liked reviews yet</p>
                </div>
              )}
              {activeSection === "archived" && (
                <div className="text-center py-10">
                  <h2 className="text-xl font-bold text-white mb-2">Archived Reviews</h2>
                  <p className="text-zinc-400">No archived reviews yet</p>
                </div>
              )}
              {activeSection === "wall-of-love" && (
                <div className="text-center py-10">
                  <h2 className="text-xl font-bold text-white mb-2">Wall of Love</h2>
                  <p className="text-zinc-400">Your wall of love is empty</p>
                </div>
              )}
              {activeSection === "create-tags" && (
                <div className="text-center py-10">
                  <h2 className="text-xl font-bold text-white mb-2">Create Tags</h2>
                  <p className="text-zinc-400">Create tags to organize your reviews</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Edit Space Dialog */}
      <EditSpaceDialog edit={true} open={open} setOpen={setopen} spaceid="dummy-space-id" />
    </SidebarProvider> 
    </>
  ) 
}

