import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, ShoppingBag, Utensils } from "lucide-react";

export default function ProviderDashboard() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Provider Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your meals and orders here.
          </p>
        </div>
        <Link href="/provider/add-meal">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" /> Add New Meal
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <span className="text-2xl font-bold">৳</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.00</div>
            <p className="text-xs text-muted-foreground">+0% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Meals</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Meals currently listed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Orders received</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Meals Section Placeholder */}
      <div className="border rounded-lg p-8 text-center bg-muted/10">
        <h3 className="text-lg font-medium mb-2">No meals added yet</h3>
        <p className="text-muted-foreground mb-4">
          Start selling by adding your first meal item.
        </p>
        <Link href="/provider/add-meal">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" /> Add New Meal
          </Button>
        </Link>
      </div>
    </div>
  );
}
