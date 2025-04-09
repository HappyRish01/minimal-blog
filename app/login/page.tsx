import { login } from "@/app/actions/auth"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 p-8">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form action={login} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <p className="text-zinc-600 dark:text-zinc-400">
            {/* <Link href="/register" className="text-emerald-600 dark:text-emerald-400 hover:underline">
              Register
            </Link> */}
          </p>
        </div>
      </div>
    </div>
  )
}
