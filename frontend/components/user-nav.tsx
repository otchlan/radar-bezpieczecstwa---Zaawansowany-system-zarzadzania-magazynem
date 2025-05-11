import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@dowodca" />
            <AvatarFallback>DO</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 dark:bg-zinc-900 dark:border-zinc-800" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Dowódca Operacyjny</p>
            <p className="text-xs leading-none text-muted-foreground dark:text-zinc-400">dowodca@wojsko.pl</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="dark:bg-zinc-800" />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profil</DropdownMenuItem>
          <DropdownMenuItem>Ustawienia</DropdownMenuItem>
          <DropdownMenuItem>Protokoły bezpieczeństwa</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="dark:bg-zinc-800" />
        <DropdownMenuItem>Wyloguj</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
