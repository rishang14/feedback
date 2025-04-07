"use client";

import { Button } from "@/components/ui/button";
import {
  Inbox,
  Video,
  MessageSquare,
  Heart,
  Archive,
  AlertTriangle,
  Boxes,
  Lock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { TestimonialCard } from "@/components/testimonial.Card";
import { toast } from "sonner";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import { useSpaceDetails } from "@/store/spaceDetails";

export default function page() {
  const [activeSection, setActiveSection] = useState("all");
  // @ts-ignore
  // const { SpaceQuestion } = useSpaceDetails();
  const router = useRouter();
  const { status } = useSession();
  // console.log(SpaceQuestion, "spaceqUESTION");

  if (status === "loading") return <Loading />;
  if (status !== "authenticated") {
    router.push("/auth/signin");
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

  return (
    <div className="min-h-screen bg-foreground">
      {/* Header */}
      <header className="border-b">
        <div className="flex h-16 items-center px-4 md:px-6">
          <h1 className="text-2xl font-semibold text-white">first</h1>
          <div className="ml-auto flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Video className="h-4 w-4" />
              <span className="text-white">Video credits :</span>
              <span className="text-muted-foreground ">2</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span className="text-white">Text credits</span>
              <span className="text-muted-foreground">10</span>
            </div>
            <Button className="text-white">Edit space</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r h-[calc(100vh-4rem)] p-4">
          <h2 className="text-lg font-semibold mb-4 text-white ">Inbox</h2>
          <div className="space-y-2">
            {sidebarButton(
              <Inbox className="mr-2 h-4 w-4 text-white" />,
              "All",
              "all"
            )}
            {sidebarButton(
              <Video className="mr-2 h-4 w-4 text-white" />,
              "Video",
              "video"
            )}
            {sidebarButton(
              <MessageSquare className="mr-2 h-4 w-4 text-white " />,
              "Text",
              "text"
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
            {sidebarButton(
              <AlertTriangle className="mr-2 h-4 w-4 text-white" />,
              "Spam",
              "spam"
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Integrations
            </h2>
            {sidebarButton(
              <Boxes className="mr-2 h-4 w-4 text-white" />,
              "View integrations",
              "integrations"
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Embed widgets
            </h2>
            <div className="space-y-2">
              {sidebarButton(
                <Heart className="mr-2 h-4 w-4 text-white" />,
                "Wall of Love",
                "wall-of-love"
              )}
              {sidebarButton(
                <MessageSquare className="mr-2 h-4 w-4 text-white" />,
                "Single testimonial",
                "single-testimonial"
              )}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl">
            <TestimonialCard
              type="Text"
              rating={5}
              content="HELLO EVERYone"
              name="Rishang"
              date="15 jan 2024"
            />
          </div>
          {/* <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-background border">
              <TabsTrigger 
                value="all"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white hover:bg-blue-500/10 data-[state=active]:hover:bg-blue-500"
              >
                All
              </TabsTrigger>
              <TabsTrigger 
                value="good"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white hover:bg-blue-500/10 data-[state=active]:hover:bg-blue-500"
              >
                Good
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <Boxes className="h-16 w-16 text-muted-foreground" />
                <h3 className="text-xl font-semibold text-white">No testimonials yet</h3>
                <div className="flex space-x-4">
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    <Video className="mr-2 h-4 w-4 text-white" />
                     Add a video
                  </Button>
                  <Button variant="outline" className="">
                    <MessageSquare className="mr-2 h-4 w-4 text-black" />
                    Add a text
                  </Button>
                  <Button variant="outline" className="">
                    <Lock className="mr-2 h-4 w-4 text-black" />
                    Bulk import
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="good">
              <div className="flex flex-col items-center justify-center min-h-[400px]">
                <p className="text-muted-foreground ">No good testimonials yet</p>
              </div>
            </TabsContent>
          </Tabs> */}
        </main>
      </div>
    </div>
  );
}
