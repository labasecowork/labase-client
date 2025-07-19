import { axiosInstance } from "@/interceptors/axios";

export const getProfile = async () => {
  const response = await axiosInstance.get(
    "http://localhost:3000/api/v1/users/profile"
  );
  return response.data;
};
