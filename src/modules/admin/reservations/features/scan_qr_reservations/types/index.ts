import type { Space } from "@/modules/client/space/features/get_spaces/types";

export interface AdminUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  user_type: string;
  profile_image: string | null;
  phone: string | null;
  birth_date: string | null;
  gender: string | null;
  status: string;
  creation_timestamp: string;
}

export interface AdminReservation {
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
  user: AdminUser;
}

export interface AdminResolveReservationResponse {
  reservation: AdminReservation;
  status: "upcoming" | "active" | "past";
}

export interface AdminApiResponse {
  status: number;
  message: string;
  description: string;
  timestamp: string;
  path: string;
  data: AdminResolveReservationResponse;
}
