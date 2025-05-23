import { Card, CardContent } from "@/components/ui/card"
import { StarIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface AlbumCardProps {
  title: string
  artist: string
  cover: string
  rating: number | null
  reviewer?: string
}

export function AlbumCard({ title, artist, cover, rating, reviewer }: AlbumCardProps) {
  return (
    <Card className="overflow-hidden border-transparent">
      <div className="relative aspect-square">
        <img src={cover || "/placeholder.svg"} alt={`${title} by ${artist}`} className="object-cover" />
      </div>
      <CardContent className="p-3">
        <h3 className="font-medium truncate" title={title}>
          {title}
        </h3>
        <p className="text-sm text-muted-foreground truncate" title={artist}>
          {artist}
        </p>
        {rating !== null && (
          <div className="flex items-center mt-1">
            <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
          </div>
        )}
        {reviewer && (
          <div className="flex items-center mt-2 pt-2 border-t border-border/50">
            reviewer
          </div>
        )}
      </CardContent>
    </Card>
  )
}
