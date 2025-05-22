
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface Album {
  name: string
  artist: string
  image: string
}

interface RatingModalProps {
  album: Album | null
  isOpen: boolean
  onClose: () => void
  onSubmit: (rating: number, comment: string) => void
}

export function RatingModal({ album, isOpen, onClose, onSubmit }: RatingModalProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmit = () => {
    if (rating === 0) return
    onSubmit(rating, comment)
    resetForm()
  }

  const resetForm = () => {
    setRating(0)
    setHoveredRating(0)
    setComment("")
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!album) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Rate Album</DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 items-start mt-4">
          <div className="relative h-24 w-24 flex-shrink-0">
            <img
              src={album.image || "/placeholder.svg?height=96&width=96"}
              alt={`${album.name} by ${album.artist}`}
              className="object-cover rounded-md"
            />
          </div>
          <div>
            <h3 className="font-medium text-lg">{album.name}</h3>
            <p className="text-muted-foreground">{album.artist}</p>

            <div className="flex items-center mt-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-8 w-8 cursor-pointer transition-all ${
                    star <= (hoveredRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300 hover:text-gray-400"
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                />
              ))}
              {rating > 0 && <span className="ml-2 text-lg font-medium">{rating}/5</span>}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={rating === 0}>
            Submit Rating
          </Button>
        </DialogFooter>
      </DialogContent>

    </Dialog>


  )
}
