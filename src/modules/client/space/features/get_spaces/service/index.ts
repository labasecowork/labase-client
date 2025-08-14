import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type { Space } from "@/modules/client/space/features/get_spaces/types";
interface SpacesResponse {
  spaces: Space[];
}

const getSpacesRequest = async (): Promise<SpacesResponse> => {
  const { data } = await axiosInstance.get<Response<SpacesResponse>>("/spaces");
  if (!data.data) {
    throw new Error("La respuesta del servidor no contiene los espacios.");
  }
  return data.data;
};

export const useGetSpaces = () => {
  return useQuery({
    queryKey: ["spaces"],
    queryFn: getSpacesRequest,
  });
};

export const useGetAvailableSpaces = () => {
  const { data: spacesData, ...rest } = useGetSpaces();

  const availableSpaces = spacesData?.spaces.filter((space) => {
    if (space.disabled) return false;
    return true;
  });

  return {
    ...rest,
    data: spacesData ? { spaces: availableSpaces || [] } : undefined,
  };
};
