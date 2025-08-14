import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type {
  Article,
  ArticlesResponse,
  ArticlesData,
  GetArticlesParams,
} from "../types";

const getArticlesRequest = async (
  params?: GetArticlesParams
): Promise<ArticlesResponse> => {
  const { data } = await axiosInstance.get<Response<ArticlesData>>(
    "/articles",
    {
      params,
    }
  );

  if (!data.data) {
    throw new Error(
      "Error al obtener los artículos, el servidor no contiene los datos esperados."
    );
  }

  return {
    data: data.data,
  };
};

export const useGetArticles = (params?: GetArticlesParams) => {
  return useQuery({
    queryKey: ["articles", params],
    queryFn: () => getArticlesRequest(params),
  });
};

export const useGetArticle = (id: string) => {
  return useQuery({
    queryKey: ["articles", id],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<Response<Article>>(
          `/articles/${id}`
        );

        if (!data.data) {
          throw new Error(
            "Error al obtener el artículo, el servidor no contiene los datos esperados."
          );
        }
        return data.data;
      } catch (error) {
        console.error("Error fetching article:", error);
        throw error;
      }
    },
    enabled: !!id,
  });
};
