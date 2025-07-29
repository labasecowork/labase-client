import { AsyncBoundary } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect, useState } from "react";
import { getReservationsRequest } from "../service";
import { useQuery } from "@tanstack/react-query";
import {
  EmptyState,
  ErrorState,
  Header,
  LoadingState,
  ReservationTable,
} from "../components";
import { socket } from "@/lib/socket";
import type { Reservation } from "../types";

export default function ViewAllReservationsPage() {
  const { changeTitle } = useTitle();
  const [allReservations, setAllReservations] = useState<Reservation[]>([]);

  const {
    data: reservationsData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservationsRequest,
  });

  useEffect(() => {
    if (reservationsData?.data) {
      setAllReservations(reservationsData.data);
    }
  }, [reservationsData]);

  useEffect(() => {
    const onNewReservation = (newReservation: {
      reservationId: string;
      user: { name: string; lastName: string };
      startTime: string;
      endTime: string;
      people: number;
      price: number;
      spaceName: string;
      fullRoom: boolean;
    }) => {
      console.log("Nueva reservación recibida:", newReservation);

      const formattedReservation: Reservation = {
        id: newReservation.reservationId,
        userId: "", // No disponible en el websocket
        spaceId: "", // No disponible en el websocket
        startTime: newReservation.startTime,
        endTime: newReservation.endTime,
        people: newReservation.people,
        fullRoom: newReservation.fullRoom,
        codeQr: newReservation.reservationId,
        price: newReservation.price.toString(),
        createdAt: new Date().toISOString(),
        user: {
          first_name: newReservation.user.name,
          last_name: newReservation.user.lastName,
        },
        space: {
          name: newReservation.spaceName,
        },
      };

      setAllReservations((currentReservations) => [
        formattedReservation,
        ...currentReservations,
      ]);
    };

    socket.on("RESERVATION_CREATED", onNewReservation);

    return () => {
      socket.off("RESERVATION_CREATED", onNewReservation);
    };
  }, []);

  useEffect(() => {
    changeTitle("Ver reservas - La base");
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <Header />
      <AsyncBoundary
        isLoading={isPending}
        isError={isError}
        data={reservationsData?.data || []}
        LoadingComponent={<LoadingState />}
        ErrorComponent={<ErrorState />}
        EmptyComponent={<EmptyState />}
      >
        {() => <ReservationTable reservations={allReservations} />}
      </AsyncBoundary>
    </div>
  );
}
