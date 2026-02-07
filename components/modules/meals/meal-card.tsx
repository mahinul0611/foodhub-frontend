import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export function MealCard({ title, image, price, rating, category }: any) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-border/50">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"} // Placeholder
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-2 right-2 bg-background/80 text-foreground backdrop-blur-md hover:bg-background/90">
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg line-clamp-1">{title}</h3>
            <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                <Star className="h-4 w-4 fill-current" />
                {rating}
            </div>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2">
          Delicious meal prepared with fresh ingredients and special spices.
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="font-bold text-lg text-primary">৳ {price}</span>
        <Button size="sm">Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}