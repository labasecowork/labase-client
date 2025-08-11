import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type { Article } from "../../view_articles/types";

const updateArticleRequest = async (
  id: string,
  payload: FormData,
): Promise<Article> => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const { data } = await axiosInstance.put<Response<Article>>(
    `/articles/${id}`,
    payload,
    config,
  );

  if (!data.data) {
    throw new Error(
      "Error al actualizar el artículo, el servidor no contiene los datos esperados.",
    );
  }

  return data.data;
};

export const useUpdateArticle = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: FormData) => updateArticleRequest(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

const deleteArticleRequest = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/articles/${id}`);
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteArticleRequest,
    onSuccess: () => {
      // Invalidar consultas relacionadas para actualizar los datos
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};
