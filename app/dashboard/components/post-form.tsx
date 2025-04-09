"use client"

import { createPost, updatePost } from "@/app/actions/posts"
import { useState } from "react"

type Post = {
  id: string
  title: string
  content: string
  published: boolean
} | null

export function PostForm({ post }: { post?: Post }) {
  const [title, setTitle] = useState(post?.title || "")
  const [content, setContent] = useState(post?.content || "")
  const [published, setPublished] = useState(post?.published || false)

  const action = post ? updatePost : createPost

  return (
    <form
      action={action}
      className="space-y-6 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 p-6"
    >
      {post && <input type="hidden" name="id" value={post.id} />}
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-1">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={15}
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <div className="flex items-center">
        <input
          id="published"
          name="published"
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          value="true"
          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-zinc-300 rounded"
        />
        <label htmlFor="published" className="ml-2 block text-sm">
          Publish this post
        </label>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
        >
          {post ? "Update Post" : "Create Post"}
        </button>
      </div>
    </form>
  )
}
