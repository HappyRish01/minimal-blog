"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

export async function vote(formData: FormData) {
  const postId = formData.get("postId") as string
  const value = Number.parseInt(formData.get("value") as string)

  // Get IP address from headers
  const headersList = headers()
  const forwardedFor = await headersList.get("x-forwarded-for")
  const ipAddress = forwardedFor ? forwardedFor.split(",")[0] : "unknown"

  // Check if user has already voted
  const existingVote = await prisma.vote.findUnique({
    where: {
      postId_ipAddress: {
        postId,
        ipAddress,
      },
    },
  })

  if (existingVote) {
    // If vote value is the same, remove the vote
    if (existingVote.value === value) {
      await prisma.vote.delete({
        where: {
          id: existingVote.id,
        },
      })
    } else {
      // Otherwise, update the vote
      await prisma.vote.update({
        where: {
          id: existingVote.id,
        },
        data: {
          value,
        },
      })
    }
  } else {
    // Create a new vote
    await prisma.vote.create({
      data: {
        postId,
        ipAddress,
        value,
      },
    })
  }

  revalidatePath(`/blog/[slug]`)
}
