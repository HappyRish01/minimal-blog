import type React from "react"
import { ThemeProvider } from "@/app/theme-provider"
import { Header } from "./components/header"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Varun Blog - A Minimal Blog Platform",
  description: "A minimal blog platform for two authors",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
          <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6">
            <div className="container mx-auto px-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
              &copy; Varun Blogs;
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'