import { formatDate } from "@/lib/utils"
import Link from "next/link"

type Post = {
  id: string
  title: string
  slug: string
  createdAt: Date
  author: {
    name: string
  }
  _count: {
    votes: number
  }
  voteSum: number
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors">
      <Link href={`/blog/${post.slug}`} className="block">
        <h2 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h2>
        <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
          <span>By {post.author.name}</span>
          <time dateTime={post.createdAt.toISOString()}>{formatDate(post.createdAt)}</time>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span
            className={`font-medium ${post.voteSum > 0 ? "text-emerald-600 dark:text-emerald-400" : post.voteSum < 0 ? "text-red-600 dark:text-red-400" : "text-zinc-500 dark:text-zinc-400"}`}
          >
            {post.voteSum > 0 ? "+" : ""}
            {post.voteSum}
          </span>
          <span className="text-zinc-500 dark:text-zinc-400">({post._count.votes} votes)</span>
        </div>
      </Link>
    </article>
  )
}
