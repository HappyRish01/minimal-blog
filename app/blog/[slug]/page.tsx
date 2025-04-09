import { VoteButtons } from "@/app/components/vote-buttons"
import prisma from "@/lib/prisma"
import { formatDate } from "@/lib/utils"
import { headers } from "next/headers"
import { notFound } from "next/navigation"

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const p = await params.slug
  
  const post = await prisma.post.findUnique({
    where: {
      slug: p,
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  })

  if (!post) {
    notFound()
  }

  // Get votes
  const votes = await prisma.vote.findMany({
    where: {
      postId: post.id,
    },
  })

  const voteSum = votes.reduce((sum, vote) => sum + vote.value, 0)

  // Get user's vote if any
  const headersList = headers()
  const forwardedFor = await headersList.get("x-forwarded-for")
  const ipAddress = forwardedFor ? forwardedFor.split(",")[0] : "unknown"

  const userVote = votes.find((vote) => vote.ipAddress === ipAddress)?.value || null

  return (
    <div className="max-w-3xl mx-auto">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400">
            <span>By {post.author.name}</span>
            <span className="mx-2">•</span>
            <time dateTime={post.createdAt.toISOString()}>{formatDate(post.createdAt)}</time>
          </div>
        </header>

        <div className="flex">
          <VoteButtons postId={post.id} voteSum={voteSum} userVote={userVote} />

          <div className="prose dark:prose-invert">
            {post.content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
