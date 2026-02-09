import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Meal } from "@/types";
import { ShoppingCart, Eye } from "lucide-react";

interface MealCardProps {
  meal: Meal;
}

export default function MealCard({ meal }: MealCardProps) {
  return (
    <Card className="group flex flex-col h-full overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 rounded-xl bg-white">
      
      {/* ১. ইমেজ সেকশন (ফিক্সড হাইট) */}
      <div className="relative h-52 w-full bg-gray-100 overflow-hidden">
         {meal.images?.[0] ? (
            <img 
              src={meal.images[0]} 
              alt={meal.name} 
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
         ) : (
            <div className="h-full w-full flex flex-col items-center justify-center text-gray-400 bg-gray-100">
               <span className="text-4xl">🍱</span>
               <span className="text-sm mt-2">No Image</span>
            </div>
         )}
         
         {/* প্রাইস ব্যাজ (ইমেজের ওপর) */}
         <div className="absolute top-3 right-3">
            <Badge className="bg-white/90 text-orange-600 hover:bg-white font-bold text-md px-3 py-1 shadow-sm backdrop-blur-sm">
              ৳ {meal.price}
            </Badge>
         </div>
      </div>

      {/* ২. কন্টেন্ট সেকশন */}
      <CardHeader className="p-4 pb-0">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
          {meal.name}
        </h3>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
           Category: {meal.categoryId ? "Food" : "N/A"}
        </p>
      </CardHeader>
      
      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {meal.description}
        </p>
      </CardContent>

      {/* ৩. ফুটার / বাটন সেকশন */}
      <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-3 mt-auto">
        <Link href={`/meals/${meal.id}`} className="w-full">
          <Button variant="outline" className="w-full gap-2 hover:bg-gray-100 border-gray-300">
            <Eye size={16} /> Details
          </Button>
        </Link>
        <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white gap-2 shadow-md hover:shadow-lg transition-all">
          <ShoppingCart size={16} /> Add
        </Button>
      </CardFooter>
    </Card>
  );
}