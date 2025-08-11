import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type { EditCategoryPayload, EditCategoryResponse } from "../types";

const updateCategoryRequest = async (
  id: string,
  payload: EditCategoryPayload
): Promise<EditCategoryResponse> => {
  const { data } = await axiosInstance.put<Response<EditCategoryResponse>>(
    `/articles/categories/${id}`,
    payload
  );

  if (!data.data) {
    throw new Error(
      "Error al actualizar la categoría, el servidor no contiene los datos esperados."
    );
  }

  return data.data;
};

export const useUpdateCategory = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EditCategoryPayload) => updateCategoryRequest(id, payload),
    onSuccess: () => {
      // Invalidar consultas relacionadas para actualizar los datos
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

const deleteCategoryRequest = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/articles/categories/${id}`);
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategoryRequest,
    onSuccess: () => {
      // Invalidar consultas relacionadas para actualizar los datos
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
