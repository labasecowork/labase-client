import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type {
  EditSpaceResponse,
  GetSpaceResponse,
  UpdateParams,
} from "../types";

const getSpaceByIdRequest = async (id: string): Promise<GetSpaceResponse> => {
  const { data } = await axiosInstance.get<Response<GetSpaceResponse>>(
    `/spaces/${id}`
  );
  if (!data.data) {
    throw new Error(
      "La respuesta del servidor no contiene los datos del espacio."
    );
  }
  return data.data;
};

export const useGetSpaceById = (id: string) => {
  return useQuery({
    queryKey: ["space", id],
    queryFn: () => getSpaceByIdRequest(id),
    enabled: !!id,
  });
};

const updateSpaceRequest = async ({
  id,
  payload,
}: UpdateParams): Promise<EditSpaceResponse> => {
  const { data } = await axiosInstance.put<Response<EditSpaceResponse>>(
    `/spaces/${id}`,
    payload
  );

  if (!data.data) {
    throw new Error("No se encontraron datos del espacio actualizado.");
  }
  return data.data;
};

export const useUpdateSpace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSpaceRequest,
    onSuccess: (updatedData) => {
      queryClient.invalidateQueries({ queryKey: ["spaces"] });

      const spaceId = updatedData.space.id;
      queryClient.invalidateQueries({ queryKey: ["space", spaceId] });
    },
  });
};
