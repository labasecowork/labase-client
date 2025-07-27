import { z } from "zod";

const priceSchema = z.object({
  id: z.string().optional(),
  duration: z.enum(["HOUR", "DAY", "WEEK", "MONTH"]),
  amount: z.number().min(0, "El valor debe ser positivo"),
  mode: z.enum(["INDIVIDUAL", "GROUP"]),
});

export const createSpaceSchema = z
  .object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    description: z.string().optional(),
    type: z.enum(["UNIT", "SHARED_SITE", "FULL_ROOM"]),
    access: z.enum(["PUBLIC", "PRIVATE"]),
    capacityMin: z.number().min(1, "La capacidad mínima debe ser al menos 1"),
    capacityMax: z.number().min(1, "La capacidad máxima debe ser al menos 1"),
    allowByUnit: z.boolean(),
    allowFullRoom: z.boolean(),
    prices: z.array(priceSchema).min(1, "Debes agregar al menos un precio"),
  })
  .refine((data) => data.capacityMax >= data.capacityMin, {
    message: "La capacidad máxima no puede ser menor que la mínima",
    path: ["capacityMax"],
  });
