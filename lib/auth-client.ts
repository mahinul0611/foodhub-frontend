import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000" // Apnar Next.js URL
})

export const { signIn, signUp, useSession, signOut } = authClient