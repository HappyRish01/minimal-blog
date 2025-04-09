"use server"

import { comparePassword, createToken, hashPassword } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return { error: "Invalid credentials" }
  }

  const isValid = await comparePassword(password, user.password)
  if (!isValid) {
    return { error: "Invalid credentials" }
  }

  const token = await createToken(user.id)
  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  redirect("/dashboard")
}

export async function logout() {
  cookies().delete("token")
  redirect("/")
}

export async function register(formData: FormData) {
  const email = formData.get("email") as string
  const name = formData.get("name") as string
  const password = formData.get("password") as string

  // Check if we already have 2 users
  const userCount = await prisma.user.count()
  if (userCount >= 2) {
    return { error: "Maximum number of users reached" }
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return { error: "Email already in use" }
  }

  const hashedPassword = await hashPassword(password)

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  })

  redirect("/login")
}
