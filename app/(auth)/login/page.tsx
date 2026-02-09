"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import Cookies from "js-cookie"

// Zod Schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export default function LoginPage() {
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/sign-in/email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        })

        const result = await res.json()
        
        // ডিবাগিং এর জন্য কনসোল লগ
        console.log("Server Response:", result);

        if (!res.ok) {
           throw new Error(result.message || "Login failed")
        }

        // ✅ ফিক্স ১: পোস্টম্যান অনুযায়ী সরাসরি 'token' নেওয়া
        const token = result.token; 
        
        // ✅ ফিক্স ২: ইউজার রোল 'user' অবজেক্টের ভেতর থেকে নেওয়া
        const userRole = result.user?.role;

        if (token) {
          // কুকিতে টোকেন সেট করা (নাম 'accessToken' রাখছি যাতে অ্যাপের বাকি জায়গায় কাজ করে)
          Cookies.set("accessToken", token, { expires: 7, path: '/' }) 
          
          toast.success("Login Successful! 🎉")
          
          router.refresh()
          
          // রোল অনুযায়ী রিডাইরেক্ট
          if (userRole === "PROVIDER") {
             router.push("/provider")
          } else if (userRole === "USER") {
             router.push("/customer")
          } else {
             router.push("/")
          }
        } else {
          console.error("Token missing. Response was:", result);
          toast.error("Login successful but token missing in response!")
        }

      } catch (error: any) {
        console.error("Login Error:", error)
        toast.error(error.message || "Something went wrong")
      }
    },
  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">Enter your email to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            className="grid gap-4"
          >
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  const res = loginSchema.shape.email.safeParse(value)
                  return res.success ? undefined : res.error.errors[0].message
                },
              }}
              children={(field) => (
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-red-500">{field.state.meta.errors.join(", ")}</p>
                  )}
                </div>
              )}
            />

            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  const res = loginSchema.shape.password.safeParse(value)
                  return res.success ? undefined : res.error.errors[0].message
                },
              }}
              children={(field) => (
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="ml-auto inline-block text-sm underline">Forgot password?</Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-red-500">{field.state.meta.errors.join(", ")}</p>
                  )}
                </div>
              )}
            />

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" className="w-full" disabled={!canSubmit || isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
              )}
            />
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-center text-sm w-full">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline font-bold text-primary">Sign up</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}