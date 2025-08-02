import { axiosInstance } from "@/interceptors";
import type { AttendanceResponse, RegisterAttendanceResponse } from "../types";
import type { Response } from "@/types";

export const registerAttendance = async (data: {
  type: "EXIT" | "ENTRY";
}): Promise<RegisterAttendanceResponse> => {
  const { data: response } = await axiosInstance.post<
    Response<RegisterAttendanceResponse>
  >("/attendance", data);

  if (!response.data) {
    throw new Error("La respuesta del servidor no contiene la asistencia.");
  }
  return response.data;
};

export const getAttendance = async (): Promise<AttendanceResponse> => {
  const { data } = await axiosInstance.get<Response<AttendanceResponse>>(
    "/me/attendance"
  );
  if (!data.data) {
    throw new Error("La respuesta del servidor no contiene la asistencia.");
  }
  return data.data;
};
