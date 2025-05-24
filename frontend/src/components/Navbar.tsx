"use client"

import { useState, useRef, useEffect } from "react"
import { Search, LogOut, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import logo from "@/assets/jukeboxd.svg"
import { getUserInfo } from "@/api/user"
import { User as UserType } from "@/types"

export function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)

    const [user, setUser] = useState<UserType>()
      useEffect(() => {
        getUserInfo()
        .then(setUser)
      }, []);

    // Close search dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <nav className="bg-[#3e7d3e] text-white py-3 px-4 flex items-center justify-between p-2 w-full m-0">
            <a href="/" className="flex items-center gap-3">
                <img className="p-3 h-[60px]" src={logo}></img>
                <span className="text-2xl font-bold tracking-wide">JUKEBOXD</span>
            </a>

            <div className="flex items-center gap-4">
                <div className="relative" ref={searchRef}>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-10 w-10 text-white hover:bg-[#346934] hover:text-white"
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                    >
                        <Search className="h-20 w-20" />
                    </Button>

                    {isSearchOpen && (
                        <div className="absolute right-0 top-12 w-80 bg-white rounded-md shadow-lg p-3 z-50">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search for friends..." className="pl-8" />
                            </div>
                            <div className="mt-3 max-h-60 overflow-y-auto">
                                <h3 className="text-sm font-medium text-muted-foreground mb-2 px-2">Recent Searches</h3>
                                <div className="space-y-1">
                                    <FriendSearchItem
                                        username="alex_music"
                                        fullName="Alex Johnson"
                                        image="/placeholder.svg?height=40&width=40"
                                    />
                                    <FriendSearchItem
                                        username="music_lover92"
                                        fullName="Sarah Williams"
                                        image="/placeholder.svg?height=40&width=40"
                                    />
                                    <FriendSearchItem
                                        username="indie_head"
                                        fullName="Chris Taylor"
                                        image="/placeholder.svg?height=40&width=40"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="rounded-full p-0 h-10 w-10 bg-[#222] hover:bg-[#333]">
                            <span className="sr-only">Open user menu</span>
                            <span className="text-lg font-medium">F</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem asChild>
                            <a href={"/profile/" + user?.username} className="flex items-center gap-2 cursor-pointer">
                                <User className="h-4 w-4" />
                                <span>Your Profile</span>
                            </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-500 focus:text-red-500">
                            <LogOut className="h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}

function FriendSearchItem({
    username,
    fullName,
    image,
}: {
    username: string
    fullName: string
    image: string
}) {
    return (
        <a
            href={`/profile/${username}`}
            className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-accent transition-colors"
        >
            <Avatar className="h-8 w-8">
                <AvatarImage src={image || "/placeholder.svg"} alt={username} />
                <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-sm font-medium">{fullName}</p>
                <p className="text-xs text-muted-foreground">@{username}</p>
            </div>
        </a>
    )
}

