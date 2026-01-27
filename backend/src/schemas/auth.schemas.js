import { z } from "zod";

// Signup validation schema
export const signupSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username cannot exceed 30 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email pattern"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long")
});

// Login validation schema
export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email pattern"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long")
});
