"use client"

import { useTransition } from "react"
import { vote } from "@/app/actions/votes"
import { ArrowBigDown, ArrowBigUp } from "lucide-react"
import { useOptimistic, startTransition } from "react"

type VoteButtonsProps = {
  postId: string
  voteSum: number
  userVote: number | null
}

export function VoteButtons({ postId, voteSum, userVote }: VoteButtonsProps) {
  const [isPending, startTransition] = useTransition()

  const [optimisticVoteSum, setOptimisticVoteSum] = useOptimistic(
    { sum: voteSum, userVote },
    (state, newUserVote: number | null) => {
      let newSum = state.sum

      if (state.userVote === 1 && newUserVote === null) {
        newSum -= 1
      } else if (state.userVote === -1 && newUserVote === null) {
        newSum += 1
      } else if (state.userVote === 1 && newUserVote === -1) {
        newSum -= 2
      } else if (state.userVote === -1 && newUserVote === 1) {
        newSum += 2
      } else if (state.userVote === null && newUserVote === 1) {
        newSum += 1
      } else if (state.userVote === null && newUserVote === -1) {
        newSum -= 1
      }

      return { sum: newSum, userVote: newUserVote }
    }
  )

  const handleVote = (value: number) => {
    const newUserVote = optimisticVoteSum.userVote === value ? null : value

    // Wrap in a transition
    startTransition(() => {
      setOptimisticVoteSum(newUserVote)
    })

    const formData = new FormData()
    formData.append("postId", postId)
    formData.append("value", value.toString())

    // No need to await inside event handler for optimistic updates
    vote(formData)
  }

  return (
    <div className="flex flex-col items-center gap-2 mr-4">
      <button
        onClick={() => handleVote(1)}
        className={`p-2 rounded-full transition-colors ${
          optimisticVoteSum.userVote === 1
            ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400"
            : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
        }`}
        aria-label="Upvote"
        disabled={isPending}
      >
        <ArrowBigUp size={24} />
      </button>
      <span
        className={`font-bold text-lg ${
          optimisticVoteSum.sum > 0
            ? "text-emerald-600 dark:text-emerald-400"
            : optimisticVoteSum.sum < 0
              ? "text-red-600 dark:text-red-400"
              : "text-zinc-500 dark:text-zinc-400"
        }`}
      >
        {optimisticVoteSum.sum}
      </span>
      <button
        onClick={() => handleVote(-1)}
        className={`p-2 rounded-full transition-colors ${
          optimisticVoteSum.userVote === -1
            ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
            : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
        }`}
        aria-label="Downvote"
        disabled={isPending}
      >
        <ArrowBigDown size={24} />
      </button>
    </div>
  )
}
