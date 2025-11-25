import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboard, LetterText, LucideLogOut, Settings, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "Reports",
    url: "#",
    icon: LetterText,
  },
  {
    title: "Profile",
    url: "#",
    icon: User,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]


export function AppSidebar() {

  return (
    <Sidebar>
      <SidebarHeader className="text-center mb-8">
        CordInsights
      </SidebarHeader >

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      < SidebarFooter >
        <div className="flex items-center gap-x-4 justify-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p>Raman Tamang</p>
            <p>raman@gmail.com</p>
          </div>
        </div>
      </ SidebarFooter >
    </Sidebar>
  )
}