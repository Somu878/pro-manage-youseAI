import React from 'react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { deleteCookie} from "cookies-next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavbarProps {
  userName: User
}

export interface User {
  name: string;
  email: string;
}

export default function Navbar({ userName }: NavbarProps) {
    const router = useRouter();
  const handleLogout = () => {
    deleteCookie("token")
    router.push("/on-board")
  }
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <span className="self-center text-m font-semibold whitespace-nowrap md:xl dark:text-white">Pro Manage</span>
        </div>
        <div className="flex items-center">
          <span className="hidden md:block mr-4 text-sm font-medium text-gray-900 dark:text-white">Welcome, {userName?.name as unknown as string}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  {/* <AvatarImage src="/placeholder-avatar.jpg" alt={userName} /> */}

                  <AvatarFallback>{userName?.name.charAt(0) as unknown as string}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName?.name as unknown as string}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userName?.email as unknown as string}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className='text-red-500'>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}