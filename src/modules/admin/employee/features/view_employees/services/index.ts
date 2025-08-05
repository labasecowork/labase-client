import { axiosInstance } from "@/interceptors";

export const getEmployees = async () => {
  const response = await axiosInstance.get("/employee");
  return response.data.data;
};
