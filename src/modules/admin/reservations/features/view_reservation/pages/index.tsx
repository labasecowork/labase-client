import { AsyncBoundary } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { resolveReservationRequest } from "../service";
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

  const reservationData =
    reservationDataFromState ||
    (reservationDataFromAPI ? { data: reservationDataFromAPI } : null);

  if (!reservationData && !shouldFetch) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-8">
        <ErrorState />
      </div>
    );
  }

  if (reservationDataFromState) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-8">
        <Header status={reservationDataFromState.data.status} />
        <ReservationTicket reservationData={reservationDataFromState} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
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
