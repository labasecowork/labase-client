import type z from "zod";
import type { reservationSchema } from "../schemas";

export interface Space {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  capacity: number;
}

export type ReservationFormData = z.infer<typeof reservationSchema>;
