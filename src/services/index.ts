import { axiosInstance } from "@/interceptors";

export const getProfile = async () => {
  const response = await axiosInstance.get("/users/profile");
  return response.data;
};
