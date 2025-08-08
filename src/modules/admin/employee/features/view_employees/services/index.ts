import { axiosInstance } from "@/interceptors";

export const getEmployees = async () => {
  const response = await axiosInstance.get("/employee");
  return response.data.data;
};

export const desactivateEmployee = async (userId: string) => {
  const response = await axiosInstance.delete(`/employee/${userId}`);
  return response.data.data;
};

export const activateEmployee = async (userId: string) => {
  const response = await axiosInstance.patch(`/employee/${userId}/activate`);
  return response.data.data;
};
