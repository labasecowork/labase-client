import { z } from "zod";
import type { verifyCodeSchema } from "../schemas";

export type VerifyCodeData = z.infer<typeof verifyCodeSchema>;
