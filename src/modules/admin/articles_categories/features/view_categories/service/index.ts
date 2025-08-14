import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type {
  CategoriesResponse,
  Category,
  GetCategoriesParams,
} from "../types";

const getCategoriesRequest = async (
  params?: GetCategoriesParams,
): Promise<CategoriesResponse> => {
  const { data } = await axiosInstance.get<Response<Category[]>>(
    "/articles/categories",
    {
      params,
    },
  );

  if (!data.data) {
    throw new Error(
      "Error al obtener las categorías, el servidor no contiene los datos esperados.",
    );
  }

  // Transformar la respuesta al formato esperado por los componentes
  return {
    categories: data.data,
    total: data.data.length,
  };
};

export const useGetCategories = (params?: GetCategoriesParams) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => getCategoriesRequest(params),
  });
};

export const useGetCategory = (id: string) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Response<Category>>(
        `/articles/categories/${id}`,
      );

      if (!data.data) {
        throw new Error(
          "Error al obtener la categoría, el servidor no contiene los datos esperados.",
        );
      }
      return data.data;
    },
    enabled: !!id,
  });
};
