import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors/axios";
import type { Response } from "@/types/services";
import type { ResolveReservationResponse } from "../types";

const resolveReservationRequest = async (
  code: string
): Promise<ResolveReservationResponse> => {
  const { data } = await axiosInstance.post<
    Response<ResolveReservationResponse>
  >("/reservations/resolve", { code });

  if (!data.data) {
    throw new Error(
      "La respuesta del servidor no contiene los datos de la reserva."
    );
  }
  return data.data;
};

export const useResolveReservationByCode = (code: string) => {
  return useQuery({
    queryKey: ["reservation", code],
    queryFn: () => resolveReservationRequest(code),
    enabled: !!code,
  });
};
