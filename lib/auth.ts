import { compare, hash } from "bcryptjs"
import { sign, verify } from "jsonwebtoken"
import { cookies } from "next/headers"
// import prisma from "./prisma"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function hashPassword(password: string) {
  return hash(password, 10)
}

export async function comparePassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword)
}

export async function createToken(userId: string) {
  return sign({ userId }, JWT_SECRET, { expiresIn: "7d" })
}

export async function verifyToken(token: string) {
  try {
    return verify(token, JWT_SECRET) as { userId: string }
  } catch (error) {
    return null
  }
}

export async function getCurrentUser() {
  const cookieStore = cookies()
  const token = await cookieStore.get("token")?.value

  if (!token) return null

  const decoded = await verifyToken(token)
  if (!decoded) return null

  // const user = await prisma.user.findUnique({
  //   where: { id: decoded.userId },
  //   select: { id: true, name: true, email: true },
  // })

  return decoded
}
