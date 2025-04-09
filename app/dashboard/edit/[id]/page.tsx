import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { PostForm } from "../../components/post-form"

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
      authorId: user.id,
    },
  })

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Edit Post</h1>
      <PostForm post={post} />
    </div>
  )
}
