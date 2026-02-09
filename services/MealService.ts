"use server";

export const MealService = {
  createMeal: async (formData: any, token: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/meals/create-meal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // টোকেন পাঠানো হচ্ছে
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      return { success: res.ok, data, message: data.message };
    } catch (error: any) {
      return { success: false, message: error.message || "Something went wrong" };
    }
  }
};