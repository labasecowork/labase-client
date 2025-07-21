import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors/axios";
import type { Response } from "@/types/services";
import type { MyReservationsResponse } from "../types";

const getMyReservationsRequest = async (): Promise<MyReservationsResponse> => {
  const { data } = await axiosInstance.get<Response<MyReservationsResponse>>(
    "/me/reservations"
  );
  if (!data.data) {
    throw new Error(
      "La respuesta del servidor no contiene la lista de reservas."
    );
  }
  return data.data;
};

export const useGetMyReservations = () => {
  return useQuery({
    queryKey: ["myReservations"],
    queryFn: getMyReservationsRequest,
  });
};
