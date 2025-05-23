"use client"

import * as React from "react"
import { Home, Search, User2, UserCog2 } from "lucide-react"

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"
import { Button } from "./ui/button"

export function SearchDialog({ sidebarOpen }) {
    const [open, setOpen] = React.useState(false)


    React.useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const linkItems = [
        {
            name: "Dashboard",
            icon: <Home className="w-4 h-4" />,
            href: "/dashboard",
        },
        {
            name: "User Management",
            icon: <User2 className="w-4 h-4" />,
            href: "/user-management",
        },
        {
            name: "Role Management",
            icon: <UserCog2 className="w-4 h-4" />,
            href: "/role-management",
        },
    ]

    return (
        <>
            <Button variant="outline" className={['flex hover:cursor-text text-zinc-500', sidebarOpen && 'justify-between']} onClick={() => { setOpen(!open) }}>
                <div className="flex items-center gap-2">
                    <Search />
                    {sidebarOpen ? "Search Menu" : ""}
                </div>
                {
                    sidebarOpen &&
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                        <span className="text-xs">CTRL</span>K
                    </kbd>
                }
            </Button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Links">
                        {linkItems.map((item) => (
                            <CommandItem key={item.name}>
                                {item.icon}
                                <span>{item.name}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
