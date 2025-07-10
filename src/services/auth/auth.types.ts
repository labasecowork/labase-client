import { z } from "zod";

// --- Register ---
export const registerSchema = z
    .object({
        first_name: z.string().min(1, "El nombre es requerido"),
        last_name: z.string().min(1, "El apellido es requerido"),
        email: z.string().email("Correo electrónico inválido"),
        password: z
            .string()
            .min(8, "La contraseña debe tener al menos 8 caracteres"),
        confirm_password: z.string().min(8),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Las contraseñas no coinciden",
        path: ["confirm_password"],
    });

export type RegisterData = z.infer<typeof registerSchema>;

// --- Verification ---
export const verifyCodeSchema = z.object({
    code: z.string().min(4, "El código debe tener 4 caracteres").max(4),
});

export type VerifyCodeData = z.infer<typeof verifyCodeSchema>;

// --- Login ---
export const loginSchema = z.object({
    email: z.string().email("Correo electrónico inválido"),
    password: z.string().min(1, "La contraseña es requerida"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

export interface LoginResponse {
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        profileImage: string | null;
    };
    token: string;
}

// --- Password Reset ---
export const forgotPasswordSchema = z.object({
    email: z.string().email("Correo electrónico inválido"),
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export const changePasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, "La contraseña debe tener al menos 8 caracteres"),
        confirm_password: z.string().min(8),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Las contraseñas no coinciden",
        path: ["confirm_password"],
    });

export type ChangePasswordData = z.infer<typeof changePasswordSchema>; 