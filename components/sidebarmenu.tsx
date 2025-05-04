import {
    Sidebar,
    SidebarContent,
   SidebarGroupContent, 
   SidebarMenuButton,
   SidebarMenu,
    SidebarGroup, 
    SidebarMenuItem,
    SidebarHeader,
  } from "@/components/ui/sidebar" 
  import {
    MessageCircleCode,  
    Heart,
    Archive,
    Tags,
  } from "lucide-react"; 
   
  export function AppSidebar({activeSection,setActiveSection}:any) {
    return (
<Sidebar className="border-r border-zinc-800 bg-neutral-900">
<SidebarHeader>
  <h2 className="px-4 text-lg font-semibold text-neurtal-900">Inbox</h2>
</SidebarHeader>
<SidebarContent className="">
  <SidebarGroup>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            isActive={activeSection === "review"}
            onClick={() => setActiveSection("review")}
          >
            <MessageCircleCode className="h-4 w-4 " />
            <span >Reviews</span>
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

    )}