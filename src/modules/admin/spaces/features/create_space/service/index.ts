import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type { CreateSpaceApiPayload, CreateSpaceResponse } from "../types";

const createSpaceRequest = async (
  payload: CreateSpaceApiPayload
): Promise<CreateSpaceResponse> => {
  const { data } = await axiosInstance.post<Response<CreateSpaceResponse>>(
    "/spaces",
    payload
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
