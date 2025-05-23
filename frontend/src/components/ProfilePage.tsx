import { AlbumCard } from "@/components/AlbumCard"
import { AlbumSearchModal } from "@/components/AlbumSearchModal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useParams } from 'react-router-dom';
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Camera } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";

export default function ProfilePage() {
  const params = useParams();
  const username = params.username;
  console.log(username)

  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=80&width=80")


  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6">
          {/* Profile Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profileImage || "/placeholder.svg"} alt={"hi"} />
                </Avatar>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Change Profile Picture</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="image-url">Image URL</Label>
                        <Input
                          id="image-url"
                          placeholder="Enter image URL..."
                          value={profileImage}
                          onChange={(e) => setProfileImage(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={profileImage || "/placeholder.svg"} alt="Preview" />
                          <AvatarFallback>Preview</AvatarFallback>
                        </Avatar>
                      </div>
                      <Button className="w-full">Save Changes</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div>
                <p className="text-muted-foreground">@boy</p>
                <p className="mt-1">14 albums rated • 45 followers • 32 following</p>
              </div>
            </div>
            <AlbumSearchModal />
          </div>

          {/* <div>
            <h3 className="text-xl font-semibold mb-4">Your Top Albums</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <AlbumCard
                title="OK Computer"
                artist="Radiohead"
                cover="/placeholder.svg?height=150&width=150"
                rating={5}
              />
              <AlbumCard
                title="Abbey Road"
                artist="The Beatles"
                cover="/placeholder.svg?height=150&width=150"
                rating={5}
              />
              <AlbumCard
                title="Kind of Blue"
                artist="Miles Davis"
                cover="/placeholder.svg?height=150&width=150"
                rating={4.5}
              />
              <AlbumCard
                title="Rumours"
                artist="Fleetwood Mac"
                cover="/placeholder.svg?height=150&width=150"
                rating={4.5}
              />
            </div>
          </div> */}

          <div>
            <h3 className="text-xl font-semibold mb-4">Recent Ratings</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <AlbumCard
                title="Blonde"
                artist="Frank Ocean"
                cover="/placeholder.svg?height=150&width=150"
                rating={4.5}
              />
              <AlbumCard
                title="Currents"
                artist="Tame Impala"
                cover="/placeholder.svg?height=150&width=150"
                rating={4}
              />
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
              <AlbumCard title="Nevermind" artist="Nirvana" cover="/placeholder.svg?height=150&width=150" rating={4} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
