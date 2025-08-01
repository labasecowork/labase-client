import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type { AdminResolveReservationResponse } from "../types";

export const resolveReservationRequest = async (
  id: string
): Promise<AdminResolveReservationResponse> => {
  const { data } = await axiosInstance.get<
    Response<AdminResolveReservationResponse>
  >(`/reservations/${id}`);

  if (!data.data) {
    throw new Error(
      "La respuesta del servidor no contiene los datos de la reserva."
    );
  }
  return data.data;
};
