interface LastFmAlbumResult {
  name: string
  artist: string
  image: { "#text": string; size: string }[]
}

interface LastFmSearchResponse {
  results: {
    albummatches: {
      album: LastFmAlbumResult[]
    }
  }
}

export async function searchAlbums(searchTerm: string) {
  try {
    const apiKey = "ff67f363cc29422d8ed5fe4253bd949a"
    const url = `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${encodeURIComponent(
      searchTerm,
    )}&api_key=${apiKey}&format=json`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = (await response.json()) as LastFmSearchResponse

    // Map the response to a simpler format
    return data.results.albummatches.album.map((album) => ({
      name: album.name,
      artist: album.artist,
      // Get the largest image available, or fallback to a placeholder
      image:
        album.image.find((img) => img.size === "large")?.["#text"] ||
        album.image.find((img) => img.size === "medium")?.["#text"] ||
        "/placeholder.svg?height=150&width=150",
    }))
  } catch (error) {
    console.error("Error searching albums:", error)
    return []
  }
}
