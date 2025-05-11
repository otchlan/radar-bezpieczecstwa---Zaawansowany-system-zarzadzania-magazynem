import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "System Zarządzania Magazynami Wojskowymi",
  description: "Monitorowanie zasobów i gotowości bojowej w czasie rzeczywistym",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-50`}>{children}</body>
    </html>
  )
}
