import { AsyncBoundary } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { useGetSpaces } from "@/modules/shared/space/features/get_spaces/service";
import { Header, LoadingState, ErrorState, SpacesTable } from "../components/";

export default function ViewSpacesPage() {
  const { changeTitle } = useTitle();
  const { data: spacesResponse, isLoading, isError } = useGetSpaces();

  useEffect(() => {
    changeTitle("Gestionar Espacios - La base");
  }, [changeTitle]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <Header />

      <AsyncBoundary
        isLoading={isLoading}
        isError={isError}
        data={spacesResponse}
        LoadingComponent={<LoadingState />}
        ErrorComponent={<ErrorState />}
      >
        {(data) => <SpacesTable spaces={data?.spaces || []} />}
      </AsyncBoundary>
    </div>
  );
}
