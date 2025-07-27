import { CustomHeader, AsyncBoundary } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { useGetSpaceById } from "../service";
import { Form } from "../components";
import type { Space } from "@/modules/shared/space/features/get_spaces/types";
import type { EditSpaceData } from "../types";

const LoadingState = () => (
  <div className="mt-8 space-y-6">
    <div className="h-48 w-full animate-pulse bg-stone-100 rounded-lg"></div>
    <div className="h-64 w-full animate-pulse bg-stone-100 rounded-lg"></div>
    <div className="h-56 w-full animate-pulse bg-stone-100 rounded-lg"></div>
  </div>
);

const adaptApiDataToFormData = (apiData: Space): EditSpaceData => {
  return {
    ...apiData,
    description: apiData.description || undefined,
    prices: apiData.prices.map((p) => ({
      id: p.id,
      duration: p.duration,
      mode: p.mode,
      amount: p.amount,
    })),
  };
};

export default function EditSpacePage() {
  const { id } = useParams<{ id: string }>();
  const { changeTitle } = useTitle();
  const spaceId = id || "";

  const { data: spaceResponse, isLoading, isError } = useGetSpaceById(spaceId);

  useEffect(() => {
    const spaceName = spaceResponse?.space.name;
    changeTitle(
      spaceName
        ? `Editando: ${spaceName} - La base`
        : "Editar Espacio - La base"
    );
  }, [changeTitle, spaceResponse]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <CustomHeader title="Editar Espacio" to={ROUTES.Admin.ViewSpaces} />

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
        {(data) => {
          const formData = adaptApiDataToFormData(data.space);
          return <Form spaceId={spaceId} defaultValues={formData} />;
        }}
      </AsyncBoundary>
    </div>
  );
}
