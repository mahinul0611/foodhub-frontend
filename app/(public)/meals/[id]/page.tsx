"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Meal } from "@/types";
import { toast } from "sonner";

export default function MealDetailsPage() {
  const params = useParams();
  
  // ✅ ফিক্স: আপনার ফোল্ডারের নাম [id], তাই params.id নিতে হবে
  const mealId = params?.id as string; 

  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMealDetails = async () => {
      if (!mealId) return;

      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/meals/${mealId}`;
        console.log("Fetching:", apiUrl);

        const res = await fetch(apiUrl);
        const result = await res.json();

        if (result.success) {
          setMeal(result.data);
        } else {
          setError(result.message || "Meal not found.");
        }
      } catch (err: any) {
        console.error("Error:", err);
        setError("Network error.");
      } finally {
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [mealId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
      </div>
    );
  }

  if (error || !meal) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 text-center bg-gray-50">
        <h2 className="text-2xl font-bold text-red-500">{error || "Meal not found!"}</h2>
        <Link href="/">
          <Button variant="outline">Back to Menu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-orange-600 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Menu
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-2xl shadow-sm border">
          {/* ইমেজ */}
          <div className="h-[400px] w-full rounded-xl overflow-hidden bg-gray-100 relative">
            {meal.images?.[0] ? (
              <img src={meal.images[0]} alt={meal.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <span className="text-6xl">🍱</span>
                <span className="mt-2">No Image</span>
              </div>
            )}
            <Badge className="absolute top-4 right-4 bg-white text-orange-600 text-lg px-3 py-1 shadow-md">
                ৳ {meal.price}
            </Badge>
          </div>

          {/* ইনফো */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-extrabold text-gray-900">{meal.name}</h1>
            <p className="text-gray-600 text-lg">{meal.description}</p>
            
            <div className="pt-6 border-t mt-auto">
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12 text-lg">
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}