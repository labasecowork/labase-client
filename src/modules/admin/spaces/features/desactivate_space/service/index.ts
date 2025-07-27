import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type { DeactivateSpaceResponse } from "../types";
import { toast } from "sonner";

const deactivateSpaceRequest = async (
  spaceId: string
): Promise<DeactivateSpaceResponse> => {
  const { data } = await axiosInstance.patch<Response<DeactivateSpaceResponse>>(
    `/spaces/${spaceId}/deactivate`
  );
  if (!data.data) {
    throw new Error("Error al desactivar el espacio");
  }
  return data.data;
};

export const useDeactivateSpace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deactivateSpaceRequest,
    onSuccess: (deactivatedData) => {
      toast.success("Espacio desactivado exitosamente.");

      queryClient.invalidateQueries({ queryKey: ["spaces"] });

      const spaceId = deactivatedData.space.id;
      queryClient.invalidateQueries({ queryKey: ["space", spaceId] });
    },
    onError: (error: Error) => {
      toast.error("Error al desactivar el espacio", {
        description: error.message,
      });
    },
  });
};
