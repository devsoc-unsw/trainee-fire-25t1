"use client"

import { useState, useCallback } from "react"
import { addFriend, isUserFollowed, removeFriend } from "@/api/friends"

export function useFollow() {
    const [followLoading, setLoading] = useState(false)

    const followUser = useCallback(
      async (userId: string): Promise<boolean> => {
        try {
          setLoading(true)
          await addFriend(userId)
          return true
        } catch (error) {
          console.log({
            title: "Error",
            description: error instanceof Error ? error.message : "Failed to follow user",
            variant: "destructive",
          })
          return false
        } finally {
          setLoading(false)
        }
      },
      [],
    )

    const unfollowUser = useCallback(
      async (userId: string): Promise<boolean> => {
        try {
          setLoading(true)
          await removeFriend(userId)
          return true
        } catch (error) {
          console.log({
            title: "Error",
            description: error instanceof Error ? error.message : "Failed to unfollow user",
            variant: "destructive",
          })
          return false
        } finally {
          setLoading(false)
        }
      },
      [],
    )

    const checkFollowStatus = useCallback(async (userId: string): Promise<boolean> => {
      try {
        return await isUserFollowed(userId)
      } catch (error) {
        console.error("Failed to check follow status:", error)
        return false
      }
    }, [])


    return {
      followUser,
      unfollowUser,
      checkFollowStatus,
      followLoading,
    }
  }

