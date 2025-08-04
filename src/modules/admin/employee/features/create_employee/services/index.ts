import { axiosInstance } from "@/interceptors";

export const createEmployee = async (data: CreateEmployeeForm) => {
  const response = await axiosInstance.post("/employees", data);
  return response.data;
};
