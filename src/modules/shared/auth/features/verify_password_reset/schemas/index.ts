import { z } from "zod";

export const verifyCodeSchema = z.object({
  code: z.string().min(4, "El código debe tener 4 caracteres").max(4),
});
