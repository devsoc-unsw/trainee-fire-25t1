import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlbumCard } from "@/components/AlbumCard"
import { AlbumSearchModal } from "@/components/AlbumSearchModal"
import { Plus, ArrowRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Friends' Recent Ratings</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <AlbumCard
              title="The Dark Side of the Moon"
              artist="Pink Floyd"
              cover="/placeholder.svg?height=150&width=150"
              rating={5}
            />
            <AlbumCard
              title="To Pimp a Butterfly"
              artist="Kendrick Lamar"
              cover="/placeholder.svg?height=150&width=150"
              rating={4.5}
            />
            <AlbumCard
              title="In Rainbows"
              artist="Radiohead"
              cover="/placeholder.svg?height=150&width=150"
              rating={4}
            />
            <AlbumCard title="Blonde" artist="Frank Ocean" cover="/placeholder.svg?height=150&width=150" rating={4.5} />
            <AlbumCard title="Currents" artist="Tame Impala" cover="/placeholder.svg?height=150&width=150" rating={4} />
            <AlbumCard
              title="OK Computer"
              artist="Radiohead"
              cover="/placeholder.svg?height=150&width=150"
              rating={5}
            />
          </div>

          <h2 className="text-xl font-semibold mt-6">Friends</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <FriendCard username="alex_music" fullName="Alex Johnson" image="/placeholder.svg?height=80&width=80" />
            <FriendCard
              username="music_lover92"
              fullName="Sarah Williams"
              image="/placeholder.svg?height=80&width=80"
            />
            <FriendCard username="indie_head" fullName="Chris Taylor" image="/placeholder.svg?height=80&width=80" />
            <FriendCard username="jazz_fan" fullName="Jordan Davis" image="/placeholder.svg?height=80&width=80" />
            <FriendCard username="rock_enthusiast" fullName="Emma Wilson" image="/placeholder.svg?height=80&width=80" />
            <FriendCard username="vinyl_collector" fullName="Mike Chen" image="/placeholder.svg?height=80&width=80" />
          </div>
        </div>
      </div>
    </div>
  )
}

function FriendCard({ username, fullName, image }: { username: string; fullName: string; image: string }) {
  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow border-transparent">
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center space-y-3">
          <Avatar className="h-16 w-16">
            <AvatarImage src={image || "/placeholder.svg"} alt={fullName} />
            <AvatarFallback>
              {fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <h3 className="font-medium text-sm">@{username}</h3>
          </div>

          <Button asChild variant="outline" size="sm" className="w-full">
            <a href={`/profile/${username}`} className="flex items-center gap-2">
              <span>View Profile</span>
              <ArrowRight className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}