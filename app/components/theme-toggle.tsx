"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "../theme-provider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
    >
      {theme === "light" ? <Moon size={20} className="text-zinc-700" /> : <Sun size={20} className="text-zinc-300" />}
    </button>
  )
}
