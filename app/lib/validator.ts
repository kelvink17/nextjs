import {z} from "zod"

export const registerSchema = z.object({
    name: z.string().min(2, "NAME IS REQUIRED"),
    email: z.email("Invald email"),
    password: z.string().min(6, "password must be at least 6 characters")
})
export type RegisterForm = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "password must be at least 6 characters")
})

export type LoginForm = z.infer<typeof loginSchema>;