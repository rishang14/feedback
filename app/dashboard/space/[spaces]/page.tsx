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
import { OpenSpaceFormButton } from "@/components/SpaceFormButton";

export default function Page() {
  const [activeSection, setActiveSection] = useState("all");
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

  return (
    <div className="min-h-screen bg-foreground">
      {/* Header */}
      <header className="border-b">
        <div className="flex h-16 items-center px-4 md:px-6">
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
            <OpenSpaceFormButton
              edit={true}
              spaceid={spaces && (spaces as string)}
            />
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
        <main className="flex-1 p-6  min-h-screen max-h-screen overflow-y-auto ">
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
  );
}
