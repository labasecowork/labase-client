import { z } from "zod";
import type { loginSchema } from "../schemas";

export type LoginCredentials = z.infer<typeof loginSchema>;

export interface LoginResponse {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_image: string | null;
    user_type: "admin" | "client";
  };
  token: string;
}
