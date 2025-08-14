import { useGetMyReservations } from "../../service";
import { SpaceCard } from "../space_card";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Link } from "react-router-dom";
import type { Space } from "@/modules/client/space/features/get_spaces/types";
import { useGetAvailableSpaces } from "@/modules/client/space/features/get_spaces/service";
import {
  ExclamationTriangleIcon,
  InboxArrowDownIcon,
} from "@heroicons/react/20/solid";
import { StatusMessage } from "@/components/ui";

const formatDate = (dateString: string) => {
  return format(new Date(dateString), "d 'de' MMMM 'del' yyyy", { locale: es });
};

const formatTime = (timeString: string) => {
  return format(new Date(timeString), "p", { locale: es });
};

export const ListCard = () => {
  const {
    data: reservationsData,
    isLoading: isLoadingReservations,
    isError: isErrorReservations,
    error: errorReservations,
  } = useGetMyReservations();
  const {
    data: spacesData,
    isLoading: isLoadingSpaces,
    isError: isErrorSpaces,
    error: errorSpaces,
  } = useGetAvailableSpaces();

  if (isLoadingReservations || isLoadingSpaces) {
    return (
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
        <div className="animate-pulse bg-stone-100 h-72 w-full"></div>
        <div className="animate-pulse bg-stone-100 h-72 w-full"></div>
        <div className="animate-pulse bg-stone-100 h-72 w-full"></div>
        <div className="animate-pulse bg-stone-100 h-72 w-full"></div>
        <div className="animate-pulse bg-stone-100 h-72 w-full"></div>
      </div>
    );
  }

  if (isErrorReservations || isErrorSpaces) {
    return (
      <StatusMessage
        title="Sucedio un error"
        description={`Sucedio un error al cargar tus reservas, este error es inesperado, más información: ${
          errorReservations?.message || errorSpaces?.message
        }`}
        color="rose"
        icon={ExclamationTriangleIcon}
      />
    );
  }

  if (!reservationsData || reservationsData.data.length === 0) {
    return (
      <StatusMessage
        title="Aún no tienes ninguna reserva"
        description="Aún no tienes ninguna reserva, puedes crear una nueva reserva pulsando en el botón de crear reserva, ¡animate a crear una!."
        icon={InboxArrowDownIcon}
      />
    );
  }
  return (
    <ul
      role="list"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {reservationsData.data.map((reservation) => {
        const space = spacesData?.spaces.find(
          (s: Space) => s.id === reservation.spaceId
        );

        const price = `S/${parseFloat(reservation.price).toFixed(2)}`;

        return (
          <Link
            to={`/client/reservations/${reservation.id}`}
            key={reservation.id}
          >
            <SpaceCard
              id={reservation.id}
              spaceName={space?.name || "Espacio no encontrado"}
              spaceImageUrl={reservation.space.images[0] || ""}
              people={reservation.people}
              price={price}
              dateReservation={formatDate(reservation.startTime)}
              timeReservation={`${formatTime(
                reservation.startTime
              )} - ${formatTime(reservation.endTime)}`}
            />
          </Link>
        );
      })}
    </ul>
  );
};
