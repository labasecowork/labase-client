import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type {
  AvailabilityRequest,
  AvailabilityResponse,
  CreateReservationRequest,
  CreateReservationResponse,
} from "../types";

const checkAvailabilityRequest = async (
  req: AvailabilityRequest
): Promise<AvailabilityResponse> => {
  const { data } = await axiosInstance.post<Response<AvailabilityResponse>>(
    "/reservations/availability",
    req
  );
  if (!data.data) {
    throw new Error("La respuesta del servidor no contiene la disponibilidad.");
  }
  return data.data;
};

export const useCheckAvailability = () => {
  return useMutation({
    mutationFn: checkAvailabilityRequest,
  });
};

const createReservationRequest = async (
  req: CreateReservationRequest
): Promise<CreateReservationResponse> => {
  const { data } = await axiosInstance.post<
    Response<CreateReservationResponse>
  >("/reservations", req);
  if (!data.data) {
    throw new Error("La respuesta del servidor no contiene la reserva creada.");
  }
  return data.data;
};

export const useCreateReservation = () => {
  return useMutation({
    mutationFn: createReservationRequest,
  });
};
