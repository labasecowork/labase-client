import { z } from "zod";

export const editEmployeeSchema = z.object({
  first_name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .optional(),
  last_name: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .optional(),
  email: z.string().email("Formato de email inválido").optional(),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .optional(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Formato de teléfono inválido")
    .optional(),
  birth_date: z.date().optional(),
  gender: z.enum(["Masculino", "Femenino", "Otro"]).optional(),
});
