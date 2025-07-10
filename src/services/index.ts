import { axiosInstance } from "@/lib/axios";

export const protectedPetition = async <T>(
  url: string,
  token?: string | null,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  params?: unknown
): Promise<T> => {
  const response = await axiosInstance({
    url,
    method,
    data: method !== "GET" ? params : undefined,
    params: method === "GET" ? params : undefined,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export * from "./auth";
