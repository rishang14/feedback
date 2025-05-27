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
   
  export function AppSidebar({activeSection,setActiveSection,tagopen}:any) {
    return (
<Sidebar className="border-r border-zinc-800 bg-neutral-900">
<SidebarHeader>
  <h2 className="px-4 text-lg font-semibold text-neurtal-900">Manage Space</h2>
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
            isActive={activeSection === "archeived"}
            onClick={() => setActiveSection("archeived")}
          >
            <Archive className="h-4 w-4" />
            <span>Archived</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        {/* <SidebarMenuItem>
          <SidebarMenuButton
            isActive={activeSection === "wall-of-love"}
            onClick={() => setActiveSection("wall-of-love")}
          >
            <Heart className="h-4 w-4" />
            <span>Wall of Love</span>
          </SidebarMenuButton> 
        </SidebarMenuItem> */}
        <SidebarMenuItem>
          <SidebarMenuButton
           
            onClick={() => tagopen(true)}
          >
            <Tags className="h-4 w-4" />
            <span>Manage Tags</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</SidebarContent>
</Sidebar> 

    )}