import { axiosInstance } from "@/interceptors";
import type { ReservationResponse } from "../types";
import type { Response } from "@/types/services";

export const getReservationsRequest =
  async (): Promise<ReservationResponse> => {
    const { data } = await axiosInstance.get<Response<ReservationResponse>>(
      "/reservations"
    );
    if (!data.data) {
      throw new Error("No se encontraron reservas");
    }
    return data.data;
  };
