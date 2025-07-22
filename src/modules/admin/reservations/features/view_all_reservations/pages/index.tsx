import { AsyncBoundary } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { getReservationsRequest } from "../service";
import { useQuery } from "@tanstack/react-query";
import {
  ErrorState,
  Header,
  LoadingState,
  ReservationTable,
} from "../components";

export default function ViewAllReservationsPage() {
  const { changeTitle } = useTitle();
  const {
    data: reservations,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservationsRequest,
  });

  useEffect(() => {
    changeTitle("Ver reservas - La base");
  }, []);
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <Header />
      <AsyncBoundary
        isLoading={isPending}
        isError={isError}
        data={reservations}
        LoadingComponent={<LoadingState />}
        ErrorComponent={<ErrorState />}
      >
        {(reservations) => (
          <ReservationTable reservations={reservations?.data || []} />
        )}
      </AsyncBoundary>
    </div>
  );
}
