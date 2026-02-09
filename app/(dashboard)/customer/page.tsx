import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomerDashboard() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Hero / Search Section */}
      <div className="text-center py-10 space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Hungry? <span className="text-primary">Order Homemade!</span> 😋
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover the best homemade meals from verified providers in your area. Fresh, healthy, and delicious.
        </p>
        
        <div className="flex w-full max-w-sm mx-auto items-center space-x-2 pt-4">
          <Input type="text" placeholder="Search for Biryani, Pizza..." />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" /> Search
          </Button>
        </div>
      </div>

      {/* Meals Grid (Placeholder) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Featured Meals</h2>
        </div>

        {/* Empty State / Loading State */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Demo Card 1 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 w-full animate-pulse flex items-center justify-center text-gray-400">
                    Meal Image
                </div>
                <CardHeader className="p-4">
                    <CardTitle className="text-lg">Delicious Meal</CardTitle>
                    <p className="text-sm text-muted-foreground">Provider Name</p>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex justify-between items-center">
                    <span className="font-bold text-primary text-xl">৳ 0</span>
                    <Button size="sm">Order Now</Button>
                </CardContent>
            </Card>
            
            {/* Demo Card 2 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 w-full animate-pulse flex items-center justify-center text-gray-400">
                    Meal Image
                </div>
                <CardHeader className="p-4">
                    <CardTitle className="text-lg">Spicy Curry</CardTitle>
                    <p className="text-sm text-muted-foreground">Home Kitchen</p>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex justify-between items-center">
                    <span className="font-bold text-primary text-xl">৳ 0</span>
                    <Button size="sm">Order Now</Button>
                </CardContent>
            </Card>
        </div>
      </section>
    </div>
  );
}