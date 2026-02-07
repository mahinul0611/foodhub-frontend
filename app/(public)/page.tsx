import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight, ChefHat } from "lucide-react"
import { MealCard } from "@/components/modules/meals/meal-card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative py-20 md:py-32 bg-muted/30">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Delicious Food <br />
              <span className="text-primary">Delivered To You</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Choose from thousands of menus from top providers in your area. Fresh, fast, and tasty.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="w-full max-w-sm space-y-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9 bg-background" placeholder="Search for pizza, burger..." />
            </div>
            <Button className="w-full" size="lg">
              Find Food
            </Button>
          </div>
        </div>

        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.4] dark:opacity-[0.1]" />
      </section>

      {/* 2. Categories Section */}
      <section className="py-16 container px-4">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Browse Categories</h2>
            <Link href="/meals" className="text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {["Pizza", "Burger", "Biriyani", "Sushi", "Dessert", "Pasta"].map((cat) => (
            <div key={cat} className="flex flex-col items-center justify-center p-6 border rounded-xl hover:border-primary hover:bg-primary/5 cursor-pointer transition-all group">
              <ChefHat className="h-8 w-8 mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="font-medium">{cat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Meals Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Featured Meals</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Dummy Data for UI Check */}
            <MealCard title="Cheesy Pizza" price={450} rating={4.5} category="Pizza" image="https://images.unsplash.com/photo-1513104890138-7c749659a591" />
            <MealCard title="Beef Burger" price={250} rating={4.8} category="Burger" image="https://images.unsplash.com/photo-1568901346375-23c9450c58cd" />
            <MealCard title="Kacchi Biriyani" price={350} rating={4.9} category="Deshi" image="https://images.unsplash.com/photo-1633945274405-b6c8069047b0" />
            <MealCard title="Special Pasta" price={180} rating={4.2} category="Pasta" image="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9" />
          </div>
        </div>
      </section>

      {/* 4. CTA Provider Section */}
      <section className="py-20 container px-4">
        <div className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="z-10 max-w-xl space-y-4 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold">Become a Food Provider?</h2>
            <p className="text-primary-foreground/90 text-lg">
              Join our network, list your menu, and reach thousands of hungry customers in your city.
            </p>
            <Button variant="secondary" size="lg" className="mt-4">
              Register as Provider
            </Button>
          </div>
          {/* Decorative Circle */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
      </section>

    </div>
  )
}