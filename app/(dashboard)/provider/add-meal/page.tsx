"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Cookies from "js-cookie";

export default function AddMealPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  // ফর্ম ডাটা
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    quantity: "", 
    description: "",
  });

  // ১. ক্যাটাগরি ফেচ করা
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // আপনার পোস্টম্যানের 'Create Meals' যদি '/meals' হয়, 
        // তাহলে 'Get All Category' সম্ভবত '/categories' হবে।
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`);
        const result = await res.json();
        
        console.log("Categories Data:", result); // কনসোলে চেক করুন

        if (result.success && result.data) {
           setCategories(result.data);
        } else if (Array.isArray(result)) {
           setCategories(result); 
        } else {
           // যদি ডাটা অন্য কোনো ফরম্যাটে থাকে
           setCategories(result.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // কুকি থেকে টোকেন নেওয়া
    const token = Cookies.get("accessToken");

    if (!token) {
        toast.error("You are not logged in!");
        router.push("/login");
        return;
    }

    // ২. পোস্টম্যানের বডি অনুযায়ী ডাটা সাজানো
    const payload = {
      name: formData.name,
      categoryId: formData.categoryId,
      price: Number(formData.price), // সংখ্যায় কনভার্ট
      quantity: Number(formData.quantity), // সংখ্যায় কনভার্ট
      description: formData.description,
    };

    try {
      // ⚠️ পোস্টম্যান অনুযায়ী URL: /meals (এখানে /api নেই)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/meals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // সাধারণত Bearer লাগে, যদি কাজ না করে শুধু 'token' দিয়ে দেখবেন
          "Authorization": `${token}`, 
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) { // res.ok চেক করা ভালো
        toast.success("Meal created successfully! 🍱");
        router.push("/provider"); // সফল হলে ড্যাশবোর্ডে ফেরত
      } else {
        toast.error(result.message || "Failed to create meal");
        console.error("Error Response:", result);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-6 bg-muted/20 min-h-screen">
      <Card className="w-full max-w-2xl h-fit shadow-md">
        <CardHeader>
          <CardTitle>Add New Meal 🍱</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Meal Name</Label>
              <Input id="name" placeholder="Ex: Chicken Biryani" required onChange={handleChange} />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Short description of the meal..." required onChange={handleChange} />
            </div>

            {/* Category Dropdown */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select onValueChange={(val) => setFormData({...formData, categoryId: val})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.length > 0 ? (
                    categories.map((cat: any) => (
                      // ক্যাটাগরির নাম 'title' না 'name' সেটা কনসোলে দেখে নিবেন
                      <SelectItem key={cat.id || cat._id} value={cat.id || cat._id}>
                        {cat.title || cat.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="loading" disabled>Loading categories...</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Price & Quantity */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (৳)</Label>
                <Input id="price" type="number" placeholder="0" required onChange={handleChange} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" placeholder="1" required onChange={handleChange} />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Add Meal"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}