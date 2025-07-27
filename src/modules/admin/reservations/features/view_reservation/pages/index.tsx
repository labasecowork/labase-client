import { AsyncBoundary } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { resolveReservationRequest } from "../service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import type { AdminApiResponse } from "../types";
import { useQuery } from "@tanstack/react-query";
import {
  ErrorState,
  Header,
  LoadingState,
  ReservationTicket,
} from "../components";

export default function ViewReservationPage() {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const reservationDataFromState = location.state as AdminApiResponse | null;

  // Solo hacer petición si no hay datos en state pero sí hay código
  const shouldFetch = !reservationDataFromState && !!id;
  const {
    data: reservationDataFromAPI,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reservation", id],
    queryFn: () => resolveReservationRequest(id || ""),
    enabled: shouldFetch,
  });

  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Ver reserva - La base");
  }, [changeTitle]);

  // Determinar qué datos usar: state o API
  const reservationData =
    reservationDataFromState ||
    (reservationDataFromAPI ? { data: reservationDataFromAPI } : null);

  // No hay datos ni en state ni de API, y no hay código para buscar
  if (!reservationData && !shouldFetch) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <Header />
        <Alert variant="default" className="mt-8">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>No encontrado</AlertTitle>
          <AlertDescription>
            No se pudo encontrar la reserva solicitada. Por favor, regresa a la
            lista de reservas.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Si hay datos del state, mostrarlos directamente sin AsyncBoundary
  if (reservationDataFromState) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <Header status={reservationDataFromState.data.status} />
        <ReservationTicket reservationData={reservationDataFromState} />
      </div>
    );
  }

  // Si no hay datos del state, usar AsyncBoundary para manejar la petición
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <Header />
      <AsyncBoundary
        isLoading={isLoading}
        isError={isError}
        data={reservationDataFromAPI}
        LoadingComponent={<LoadingState />}
        ErrorComponent={<ErrorState />}
      >
        {(apiResponse) => {
          const wrappedData: AdminApiResponse = {
            data: apiResponse,
            status: 200,
            message: "",
            description: "",
            timestamp: "",
            path: "",
          };
          return (
            <>
              <Header status={apiResponse.status} />
              <ReservationTicket reservationData={wrappedData} />
            </>
          );
        }}
      </AsyncBoundary>
    </div>
  );
}
