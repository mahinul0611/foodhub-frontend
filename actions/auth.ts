"use server";

import { cookies } from "next/headers";

export async function setAuthCookie(token: string) {
  // কুকি স্টোর এক্সেস করা
  const cookieStore = await cookies();
  
  // কুকি সেট করা
  cookieStore.set("accessToken", token, {
    httpOnly: true, // সিকিউরিটির জন্য ভালো
    secure: process.env.NODE_ENV === "production",
    path: "/", // ✅ এটা সবচেয়ে জরুরি, যাতে সব পেজে কাজ করে
    maxAge: 60 * 60 * 24 * 7, // ৭ দিন
  });
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
}