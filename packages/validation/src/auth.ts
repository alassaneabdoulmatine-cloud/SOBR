import * as z from "zod";

export const loginFormSchema = z.object({
    email: z.email("Invalid email address")
        .nonempty("Email is required"),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .nonempty("Password is required"),
});

export const signupFormSchema = z
    .object({
        name: z.string()
            .min(2, "Name must be at least 2 characters long")
            .nonempty("Name is required"),
        email: z.email("Invalid email address")
            .nonempty("Email is required"),
        password: z.string()
            .min(8, "Password must be at least 8 characters long")
            .nonempty("Password is required"),
        confirmPassword: z.string()
            .min(8, "Confirm password must be at least 8 characters long")
            .nonempty("Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export type LoginFormType = z.infer<typeof loginFormSchema>;
export type SignupFormType = z.infer<typeof signupFormSchema>;