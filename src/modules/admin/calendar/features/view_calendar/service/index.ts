import { axiosInstance } from "@/interceptors/axios";
import { useQuery } from "@tanstack/react-query";
import type { Event } from "../types";
import type { Response } from "@/types";

const getCalendar = async (): Promise<Event[]> => {
  const { data } = await axiosInstance.get<Response<Event[]>>("/calendar");
  if (!data.data) {
    throw new Error(
      "La respuesta del servidor no contiene la lista de reservas."
    );
  }
  return data.data;
};

export const useGetCalendar = () => {
  return useQuery({
    queryKey: ["calendar"],
    queryFn: getCalendar,
  });
};
