"use server";

export const CategoryService = {
  getAllCategories: async () => {
    try {
      // আপনার পোস্টম্যানের ঠিক যেই URL এ ক্যাটাগরি আসে, সেটা এখানে দিন
      // সাধারণত: /api/categories অথবা /api/category
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // ডাটা যেন সবসময় ফ্রেশ থাকে
      });

      const result = await res.json();
      
      // আপনার API রেসপন্স যদি { success: true, data: [...] } এমন হয়
      if (result.success && result.data) {
        return result.data;
      }
      
      // অথবা যদি সরাসরি অ্যারে রিটার্ন করে
      return result; 
      
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }
};