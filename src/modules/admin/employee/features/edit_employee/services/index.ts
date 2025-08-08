import { axiosInstance } from "@/interceptors";
import { type EditEmployeeForm, type Employee } from "../types";
import type { Response } from "@/types";

export const editEmployee = async (id: string, data: EditEmployeeForm) => {
  const response = await axiosInstance.patch(`/employee/${id}`, data);
  return response.data;
};

export const getEmployee = async (id: string): Promise<Employee> => {
  const response = await axiosInstance.get<Response<Employee>>(
    `/employee/${id}`
  );
  if (!response.data.data) {
    throw new Error("Empleado no encontrado");
  }
  return response.data.data;
};
