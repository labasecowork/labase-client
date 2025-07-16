import type { Space } from "@/modules/client/space/features/get_spaces/types";
import type { User } from "@/store";

export interface Reservation {
  id: string;
  userId: string;
  spaceId: string;
  startTime: string;
  endTime: string;
  people: number;
  fullRoom: boolean;
  codeQr: string;
  price: string;
  createdAt: string;
  space: Space;
  user: User;
}

export interface ResolveReservationResponse {
  reservation: Reservation;
  status: "upcoming" | "active" | "past";
}
