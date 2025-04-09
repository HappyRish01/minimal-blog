"use client"

import { logout } from "@/app/actions/auth"
import { ChevronDown, LogOut, Settings } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

type User = {
  id: string
  name: string
  email: string
}

export function UserMenu({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        <span className="font-medium">{user.name}</span>
        <ChevronDown size={16} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-md shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="py-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings size={16} />
              Dashboard
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 w-full text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
