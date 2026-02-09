"use client";

import { useEffect, useState } from "react";
import { Meal } from "@/types";
import { Loader2 } from "lucide-react";
import MealCard from "@/components/modules/meals/meal-card";

export default function HomePage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/meals`);
        const result = await res.json();

        if (result.success) {
          setMeals(result.data);
        } else {
          console.error("Failed to fetch meals");
        }
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto py-12 px-4 md:px-6">
        
        {/* হেডার সেকশন */}
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Delicious Meals <span className="text-orange-500">Menu</span> 😋
          </h1>
          <p className="text-gray-500 md:text-lg max-w-2xl mx-auto">
            Choose from our wide range of delicious meals cooked by expert providers.
          </p>
        </div>

        {/* লোডিং বা ডাটা দেখানো */}
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
          </div>
        ) : meals.length > 0 ? (
          // ✅ রেসপন্সিভ গ্রিড ফিক্স
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {meals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No meals available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}