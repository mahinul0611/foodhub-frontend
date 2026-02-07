"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(11, "Phone number must be valid"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["USER", "PROVIDER"]),
})

export default function RegisterPage() {
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "USER" as "USER" | "PROVIDER",
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/sign-up/email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        })

        const result = await res.json()
        if (!res.ok) throw new Error(result.message || "Registration failed")

        toast.success("Account created! Please login.")
        router.push("/login")
      } catch (error: any) {
        toast.error(error.message || "Something went wrong")
      }
    },
  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
          <CardDescription className="text-center">Join FoodHub as a Customer or Provider</CardDescription>
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
            {/* Name */}
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) => {
                  const res = registerSchema.shape.name.safeParse(value)
                  return res.success ? undefined : res.error.errors[0].message
                },
              }}
              children={(field) => (
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
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

            {/* Email */}
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  const res = registerSchema.shape.email.safeParse(value)
                  return res.success ? undefined : res.error.errors[0].message
                },
              }}
              children={(field) => (
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
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

            {/* Phone */}
            <form.Field
              name="phone"
              validators={{
                onChange: ({ value }) => {
                  const res = registerSchema.shape.phone.safeParse(value)
                  return res.success ? undefined : res.error.errors[0].message
                },
              }}
              children={(field) => (
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="01712345678"
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

            {/* Password */}
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  const res = registerSchema.shape.password.safeParse(value)
                  return res.success ? undefined : res.error.errors[0].message
                },
              }}
              children={(field) => (
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
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

            {/* Role (Shadcn Select + TanStack Form) */}
            <form.Field
              name="role"
              children={(field) => (
                <div className="grid gap-2">
                  <Label>I want to join as a</Label>
                  <Select value={field.state.value} onValueChange={field.handleChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">Customer (Order Food)</SelectItem>
                      <SelectItem value="PROVIDER">Provider (Sell Food)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" className="w-full mt-2" disabled={!canSubmit || isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Account
                </Button>
              )}
            />
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-center text-sm w-full">
            Already have an account?{" "}
            <Link href="/login" className="underline font-bold text-primary">Login</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}