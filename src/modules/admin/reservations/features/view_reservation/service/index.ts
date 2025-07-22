import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type { AdminResolveReservationResponse } from "../types";

const resolveReservationRequest = async (
  code: string
): Promise<AdminResolveReservationResponse> => {
  const { data } = await axiosInstance.post<
    Response<AdminResolveReservationResponse>
  >("/reservations/resolve", { code });

  if (!data.data) {
    throw new Error(
      "La respuesta del servidor no contiene los datos de la reserva."
    );
  }
  return data.data;
};

export const useResolveReservationByCode = (
  code: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["admin-reservation", code],
    queryFn: () => resolveReservationRequest(code),
    enabled: !!code && enabled,
  });
};
