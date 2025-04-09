import { getCurrentUser } from "@/lib/auth"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { UserMenu } from "./user-menu"

export async function Header() {
  const user = await getCurrentUser()

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          <span className="text-emerald-600 dark:text-emerald-400">Varun</span>Blog
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
