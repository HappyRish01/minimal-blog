import { PostCard } from "@/app/components/post-card"
import prisma from "@/lib/prisma"
import Link from "next/link"

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      createdAt: true,
      author: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          votes: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  })

  // Calculate vote sum for each post
  const postsWithVotes = await Promise.all(
    posts.map(async (post) => {
      const votes = await prisma.vote.findMany({
        where: {
          postId: post.id,
        },
        select: {
          value: true,
        },
      })

      const voteSum = votes.reduce((sum, vote) => sum + vote.value, 0)

      return {
        ...post,
        voteSum,
      }
    }),
  )

  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to Varun Blog</h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            Here i varun write about my life and my experiences. I hope you enjoy reading
          </p>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Latest Posts</h2>
          <Link href="/archive" className="text-emerald-600 dark:text-emerald-400 hover:underline">
            View all
          </Link>
        </div>

        {postsWithVotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {postsWithVotes.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg">
            <p className="text-zinc-500 dark:text-zinc-400 mb-4">No posts yet</p>
            <Link
              href="/login"
              className="inline-block px-4 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            >
              Login to create a post
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
