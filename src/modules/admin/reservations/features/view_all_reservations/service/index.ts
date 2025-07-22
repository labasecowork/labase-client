import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors/axios";
import type { ReservationResponse } from "../types";
import type { Response } from "@/types/services";

const getReservationsRequest = async (): Promise<
  Response<ReservationResponse>
> => {
  const { data } = await axiosInstance.get<Response<ReservationResponse>>(
    "/reservations"
  );
  if (!data.data) {
    throw new Error("No se encontraron reservas");
  }
  return data;
};

export const useGetReservations = () => {
  return useQuery({
    queryKey: ["reservations"],
    queryFn: getReservationsRequest,
  });
};
