"use server"

import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-")
}

export async function createPost(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const published = formData.get("published") === "true"

  const slug = slugify(title)

  await prisma.post.create({
    data: {
      title,
      content,
      slug,
      published,
      authorId: user.id,
    },
  })

  revalidatePath("/dashboard")
  redirect("/dashboard")
}

export async function updatePost(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const published = formData.get("published") === "true"

  const post = await prisma.post.findUnique({
    where: { id },
    select: { authorId: true },
  })

  if (!post || post.authorId !== user.id) {
    return { error: "Unauthorized" }
  }

  await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      published,
    },
  })

  revalidatePath("/dashboard")
  revalidatePath(`/blog/${id}`)
  redirect("/dashboard")
}

export async function deletePost(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  const id = formData.get("id") as string

  const post = await prisma.post.findUnique({
    where: { id },
    select: { authorId: true },
  })

  if (!post || post.authorId !== user.id) {
    return { error: "Unauthorized" }
  }

  await prisma.post.delete({
    where: { id },
  })

  revalidatePath("/dashboard")
  redirect("/dashboard")
}
