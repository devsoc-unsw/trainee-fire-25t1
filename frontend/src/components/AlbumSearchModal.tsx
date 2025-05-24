"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Loader2, Plus } from "lucide-react"
import { searchAlbums } from "@/lib/actions"
import { RatingModal } from "./RatingModal"
import { addReview } from "@/api/reviews"

interface Album {
  name: string
  artist: string
  image: string
}

interface AlbumSearchModalProps {
  onSelectAlbum?: (album: Album) => void
  trigger?: React.ReactNode
}

export function AlbumSearchModal({ onSelectAlbum, trigger }: AlbumSearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<Album[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false)

  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    setIsLoading(true)
    try {
      const data = await searchAlbums(searchTerm)
      setResults(data)
    } catch (error) {
      console.error("Error searching albums:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleSelectAlbum = (album: Album) => {
    if (onSelectAlbum) {
      onSelectAlbum(album)
    }
    setOpen(false)
  }

  const openRatingModal = (album: Album) => {
    setSelectedAlbum(album)
    setIsRatingModalOpen(true)
  }

  const handleRatingSubmit = (rating: number, comment: string) => {
    if (!selectedAlbum) return

    // Here you would typically save the rating to your database
    addReview(selectedAlbum.name, selectedAlbum.artist, selectedAlbum.image, rating)

    setIsRatingModalOpen(false)
    // Optionally close the search modal too
    // setOpen(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger || (
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Review</span>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Search Albums</DialogTitle>
          </DialogHeader>
          <div className="flex gap-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for albums..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {results.map((album, index) => (
                <div
                  key={`${album.name}-${album.artist}-${index}`}
                  className="flex gap-3 p-3 border rounded-md hover:bg-accent transition-colors"
                >
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <img
                      src={album.image || "/placeholder.svg?height=64&width=64"}
                      alt={`${album.name} by ${album.artist}`}
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h3 className="font-medium truncate" title={album.name}>
                      {album.name}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate" title={album.artist}>
                      {album.artist}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-fit h-7 mt-1 p-0 gap-1"
                      onClick={() => openRatingModal(album)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span className="text-xs">Review</span>
                    </Button>
                  </div>
                </div>
              ))}
              {results.length === 0 && !isLoading && searchTerm && (
                <div className="col-span-2 py-8 text-center text-muted-foreground">
                  No albums found. Try a different search term.
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <RatingModal
        album={selectedAlbum}
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        onSubmit={handleRatingSubmit}
      />
    </>
  )
}