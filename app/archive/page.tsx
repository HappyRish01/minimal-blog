import { PostCard } from "@/app/components/post-card"
import prisma from "@/lib/prisma"

export default async function ArchivePage() {
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
      <h1 className="text-2xl font-bold mb-8">All Posts</h1>

      {postsWithVotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {postsWithVotes.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg">
          <p className="text-zinc-500 dark:text-zinc-400">No posts yet</p>
        </div>
      )}
    </div>
  )
}
