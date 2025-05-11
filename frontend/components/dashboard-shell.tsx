//frontend/components/dashboard-shell.tsx
import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <ThemeProvider defaultTheme="dark" forcedTheme="dark">
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen bg-zinc-900 text-zinc-100 dark">
          <AppSidebar />
          <SidebarInset className="flex-1 p-6">
            <div className="mx-auto w-full max-w-7xl space-y-6">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}
