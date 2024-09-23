import { z } from "zod";

export const userSignupSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string()
}).refine((data)=>data.password===data.confirmPassword,{
    message: "Password don't match",
    path: ["confirmPassword"],
});

export const userSigninSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});




