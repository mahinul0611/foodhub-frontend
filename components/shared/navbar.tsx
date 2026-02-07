"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

// NOTICE: "export function" (Not default)
export function Navbar() {
  const { setTheme, theme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">FoodHub 🍱</span>
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/" className="font-medium hover:text-primary">Home</Link>
          <Link href="/meals" className="font-medium hover:text-primary">Meals</Link>
          <Link href="/providers" className="font-medium hover:text-primary">Providers</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          
          <div className="hidden md:flex gap-2">
            <Link href="/login"><Button variant="ghost">Login</Button></Link>
            <Button>Sign Up</Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/">Home</Link>
                <Link href="/meals">Meals</Link>
                <Link href="/login">Login</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}