import type React from "react"
interface DashboardHeaderProps {
  title: string
  description: string
  children?: React.ReactNode
}

export function DashboardHeader({ title, description, children }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-zinc-400">{description}</p>
      </div>
      {children}
    </div>
  )
}
