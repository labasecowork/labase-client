import type z from "zod";
import type { reservationSchema } from "../schemas";

export type Duration = "HOUR" | "DAY" | "WEEK" | "MONTH";
export type SpaceType = "FULL_ROOM" | "INDIVIDUAL";
export type SpaceAccess = "PUBLIC" | "PRIVATE";

export interface AvailabilityRequest {
  spaceId: string;
  startTime: string;
  endTime: string;
}

export interface AvailabilityResponse {
  available: boolean;
}

export interface CreateReservationRequest {
  spaceId: string;
  startTime: string;
  endTime: string;
  people: number;
  fullRoom: boolean;
}

export interface CreateReservationResponse {
  reservation_id: string;
  codeQr: string;
  user: {
    id: string;
    user_type: "admin" | "client";
    status: "active" | "inactive";
    adminDetails: null | unknown;
  };
}

type ReservationSchemaFunction = typeof reservationSchema;
export type ReservationFormData = z.infer<
  ReturnType<ReservationSchemaFunction>
>;
