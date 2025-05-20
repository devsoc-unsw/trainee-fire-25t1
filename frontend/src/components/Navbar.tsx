import logo from '../assets/jukeboxd.svg'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
import { Link } from "@radix-ui/react-navigation-menu"
import { Button } from './ui/button'
import { User, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

const Navbar = () => {
    return (
        <NavigationMenu className="bg-green-600 p-2 w-full m-0 flex justify-between items-center">
            <NavigationMenuList>
                <img className="p-3 h-[60px]" src={logo}></img>
                <h1 className="text-white"> JUKEBOXD </h1>
            </NavigationMenuList>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Open</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem
                            // checked={showStatusBar}
                            // onCheckedChange={setShowStatusBar}
                            >
                            Status Bar
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    <Button size="icon" className="bg-white hover:bg-gray-300">
                        <User color="black"/>
                    </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Button size="icon" className="bg-white hover:bg-gray-300">
                        <Search color="black"/>
                    </Button>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Navbar
