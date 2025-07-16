import { z } from "zod";
import type { changePasswordSchema } from "../schemas";

export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
