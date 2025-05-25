"use client"

import { useState, useEffect, useCallback } from "react"
import type { User } from "@/types"
import { searchUsers as searchUsersEndpoint } from "@/api/user"

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export function useUserSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedQuery = useDebounce(query, 300)

  const searchUsers = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    try {
      setLoading(true)
      setError(null)
      const users = await searchUsersEndpoint(searchQuery)
      setResults(users)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to search users")
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    searchUsers(debouncedQuery)
  }, [debouncedQuery, searchUsers])

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    searchUsers,
  }
}