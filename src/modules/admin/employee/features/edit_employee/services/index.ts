import { axiosInstance } from "@/interceptors";
import { type CreateEmployeeForm } from "../types";

export const editEmployee = async (data: CreateEmployeeForm) => {
  const response = await axiosInstance.put("/employee", data);
  return response.data;
};
