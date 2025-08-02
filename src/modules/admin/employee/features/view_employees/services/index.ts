import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type { AttendanceResponse } from "../types";

export const getAttendance = async (): Promise<AttendanceResponse> => {
  const { data } = await axiosInstance.get<Response<AttendanceResponse>>(
    `/attendance`
  );
  if (!data.data) {
    throw new Error("La respuesta del servidor no contiene la asistencia.");
  }
  return data.data;
};
