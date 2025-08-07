import { AsyncBoundary, CustomHeader } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect, useState } from "react";
import { getReservationsRequest } from "../service";
import { useQuery } from "@tanstack/react-query";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  ReservationTable,
} from "../components";
import { socket } from "@/lib/socket";
import type { Reservation } from "../types";
import { Building2Icon, CalendarIcon, QrCodeIcon } from "lucide-react";
import { ROUTES } from "@/routes/routes";
import { Link } from "react-router-dom";

const actions = [
  {
    title: "Escanear un código QR",
    description: "Con esto podras confirmar la reserva de un cliente.",
    icon: QrCodeIcon,
    to: ROUTES.Admin.ScanCodeQRReservation,
  },
  {
    title: "Ver calendario",
    description: "Con esto podras ver el calendario de reservas.",
    icon: CalendarIcon,
    to: ROUTES.Admin.ViewCalendar,
  },
  {
    title: "Gestionar espacios",
    description:
      "Crear, editar, desactivar espacios, todo para gestionar los espacios.",
    icon: Building2Icon,
    to: ROUTES.Admin.ViewSpaces,
  },
];

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
    <div className="w-full max-w-5xl mx-auto px-4 mt-8">
      <CustomHeader title="Reservas" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {actions.map((action) => (
          <Link
            to={action.to}
            className="rounded-none w-full bg-orange-700/10 p-6 flex items-start justify-center text-sm text-orange-900 gap-2 hover:bg-orange-700/20 transition-all duration-300 cursor-pointer"
          >
            <div className="p-2 bg-orange-500/10">
              <action.icon className="h-4 w-4" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-left w-full">
                {action.title}
              </p>
              <p className="text-xs text-orange-800 text-left w-full">
                {action.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="h-full w-full mt-4">
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
    </div>
  );
}
