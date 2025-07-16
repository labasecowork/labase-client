import { useGetMyReservations } from "../../service";
import { SpaceCard } from "../space_card";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Link } from "react-router-dom";
import type { Space } from "@/modules/client/space/features/get_spaces/types";
import { useGetAvailableSpaces } from "@/modules/client/space/features/get_spaces/service";

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
      <div className="text-center text-stone-500">Cargando tus reservas...</div>
    );
  }

  if (isErrorReservations || isErrorSpaces) {
    return (
      <div className="text-center text-red-500">
        Error al cargar: {errorReservations?.message || errorSpaces?.message}
      </div>
    );
  }

  if (!reservationsData || reservationsData.data.length === 0) {
    return (
      <div className="text-center text-stone-500">
        Aún no tienes ninguna reserva. ¡Anímate a crear una!
      </div>
    );
  }
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
    >
      {reservationsData.data.map((reservation) => {
        const space = spacesData?.spaces.find(
          (s: Space) => s.id === reservation.spaceId
        );

        const price = `S/${parseFloat(reservation.price).toFixed(2)}`;

        return (
          <Link
            to={`/client/reservations/code/${reservation.codeQr}`}
            key={reservation.id}
          >
            <SpaceCard
              id={reservation.id}
              spaceName={space?.name || "Espacio no encontrado"}
              spaceImageUrl="https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg"
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
