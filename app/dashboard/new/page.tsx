import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { PostForm } from "../components/post-form"

export default async function NewPostPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Create New Post</h1>
      <PostForm />
    </div>
  )
}
