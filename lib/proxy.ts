import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// লক্ষ্য করুন: এখন ইমপোর্টগুলো "@/src" ছাড়াই হবে
import { AuthService } from "@/services/AuthService"; 
import { IUser } from "@/types";

export async function proxy(allowedRole?: "USER" | "PROVIDER") {
  const cookieStore = await cookies();
// আমরা Login পেজে নাম দিয়েছি "accessToken", তাই এখানেও সেটাই থাকতে হবে
const token = cookieStore.get("accessToken")?.value;

  if (!token) redirect("/login");

  const authData = await AuthService.getSession(token);
  const user: IUser | undefined = authData?.user || (authData as any)?.data?.user;

  if (!user) redirect("/login");

  if (allowedRole && user.role !== allowedRole) {
    if (user.role === "PROVIDER") redirect("/provider");
    else if (user.role === "USER") redirect("/customer");
    else redirect("/");
  }
  return user;
}