import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const posts = await prisma.post.findMany({
    where: {
      authorId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link
          href="/dashboard/new"
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
        >
          New Post
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
          <h2 className="font-medium">Your Posts</h2>
        </div>
        {posts.length > 0 ? (
          <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {posts.map((post) => (
              <div key={post.id} className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium mb-1">
                    <Link
                      href={`/dashboard/edit/${post.id}`}
                      className="hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                    <span>{post.published ? "Published" : "Draft"}</span>
                    <span>•</span>
                    <time dateTime={post.createdAt.toISOString()}>{formatDate(post.createdAt)}</time>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/edit/${post.id}`}
                    className="px-3 py-1 text-sm bg-zinc-100 dark:bg-zinc-700 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
                  >
                    Edit
                  </Link>
                  {post.published && (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="px-3 py-1 text-sm bg-zinc-100 dark:bg-zinc-700 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
                    >
                      View
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-zinc-500 dark:text-zinc-400">
            <p>You haven't created any posts yet.</p>
            <Link
              href="/dashboard/new"
              className="mt-4 inline-block px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
            >
              Create your first post
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
