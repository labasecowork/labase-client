import { CustomHeader, AsyncBoundary } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useParams } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { useGetSpaceById } from "../../../features/edit_space/service";
import { useEffect } from "react";
import { SpaceDetails } from "../components/space_details";

const LoadingState = () => (
  <div className="mt-8 h-[650px] w-full animate-pulse bg-stone-100"></div>
);

export default function ViewSpacePage() {
  const { id } = useParams<{ id: string }>();
  const { changeTitle } = useTitle();
  const spaceId = id || "";

  const { data: spaceResponse, isLoading, isError } = useGetSpaceById(spaceId);

  useEffect(() => {
    const spaceName = spaceResponse?.space.name;
    changeTitle(
      spaceName ? `Detalle: ${spaceName} - La base` : "Ver Espacio - La base"
    );
  }, [changeTitle, spaceResponse]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <CustomHeader title="Detalle del Espacio" to={ROUTES.Admin.ViewSpaces} />

      <AsyncBoundary
        isLoading={isLoading}
        isError={isError}
        data={spaceResponse}
        LoadingComponent={<LoadingState />}
        ErrorComponent={
          <p className="text-red-500 mt-8">
            Error al cargar los datos del espacio.
          </p>
        }
      >
        {(data) => <SpaceDetails spaceData={data} />}
      </AsyncBoundary>
    </div>
  );
}
