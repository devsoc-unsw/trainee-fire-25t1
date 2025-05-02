import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Song {
  title: string
  artist: string
  cover: string
}

const TRENDING_ID = "06tCWiOWTnuTfoKwHB8Byl" // Viral 50 Global by Top NL

export default function ProfilePage() {
  const [topTrending, setTopTrending] = useState<Song[] | null>(null)

  useEffect(() => {
    const fetchTokenAndSongs = async () => {
      const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
      const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
      const auth = btoa(`${clientId}:${clientSecret}`)

      const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${auth}`,
        },
        body: "grant_type=client_credentials",
      })
      const tokenData = await tokenRes.json()
      const accessToken = tokenData.access_token

      const fetchTracks = async (playlistId: string): Promise<Song[]> => {
        const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        const data = await res.json()
        return data.tracks.items.slice(0, 10).map((item: any) => ({
          title: item.track.name,
          artist: item.track.artists[0].name,
          cover: item.track.album.images[0].url,
        }))
      }

      const trending = await fetchTracks(TRENDING_ID)
      setTopTrending(trending)
    }

    fetchTokenAndSongs()
  }, [])

  const renderSongs = (songs: Song[] | null) => {
    if (!songs) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {songs.map((song, i) => (
          <Card key={i} className="flex items-center gap-4 p-4">
            <img src={song.cover} alt={song.title} className="w-32 h-32 rounded-md object-cover" />
            <div>
              <div className="font-semibold text-lg">{song.title}</div>
              <div className="text-sm text-gray-500">{song.artist}</div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🔥 Top Trending Songs</h1>
      {renderSongs(topTrending)}
    </div>
  )
}