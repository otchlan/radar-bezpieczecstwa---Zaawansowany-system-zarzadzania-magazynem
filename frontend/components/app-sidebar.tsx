import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AlertTriangle, BarChart3, Bell, Boxes, FileText, Home, Map, Radio, Settings, Shield, Truck } from "lucide-react"
import { UserNav } from "@/components/user-nav"

export function AppSidebar() {
  return (
    <Sidebar
      variant="inset"
      className="border-r border-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
    >
      <SidebarHeader className="border-b border-zinc-800 p-4">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-green-500" />
          <h2 className="text-lg font-bold">DOWÓDZTWO OPERACYJNE</h2>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs text-zinc-400">System aktywny</span>
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel>Nawigacja</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <a href="#">
                    <Home />
                    <span>Pulpit główny</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Boxes />
                    <span>Magazyny</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Truck />
                    <span>Logistyka</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <BarChart3 />
                    <span>Raporty</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <AlertTriangle />
                    <span>Incydenty</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/map">
                    <Map />
                    <span>Mapa</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Komunikacja</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Radio />
                    <span>Centrum dowodzenia</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Bell />
                    <span>Powiadomienia</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <FileText />
                    <span>Dokumentacja</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-zinc-800 p-4">
        <div className="flex items-center justify-between">
          <UserNav />
          <Settings className="h-5 w-5 text-zinc-400" />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}