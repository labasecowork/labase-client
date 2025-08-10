import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type { CreateSpacePayload, CreateSpaceResponse } from "../types";

const createSpaceRequest = async (
  payload: CreateSpacePayload
): Promise<CreateSpaceResponse> => {
  const config =
    payload instanceof FormData
      ? {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      : {};

  const { data } = await axiosInstance.post<Response<CreateSpaceResponse>>(
    "/spaces",
    payload,
    config
  );

  if (!data.data) {
    throw new Error(
      "Error al crear el espacio, el servidor no contiene los datos del espacio creado."
    );
  }
  return data.data;
};

export const useCreateSpace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSpaceRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spaces"] });
    },
  });
};
