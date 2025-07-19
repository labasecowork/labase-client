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
      <div className="text-center bg-red-500/10 px-4 py-16 text-sm">
        <div className="w-full max-w-[450px] mx-auto text-center">
          <ExclamationTriangleIcon className="h-10 w-10 text-rose-800 mx-auto" />
          <h2 className="text-lg font-bold font-serif text-rose-800 mt-4">
            Sucedio un error
          </h2>
          <p className="text-rose-700 text-sm mt-2">
            Sucedio un error al cargar tus reservas, este error es inesperado,
            más información:{" "}
            {errorReservations?.message || errorSpaces?.message}
          </p>
        </div>
      </div>
    );
  }

  if (!reservationsData || reservationsData.data.length === 0) {
    return (
      <div className="text-center bg-stone-500/10 px-8 py-16 rounded-lg">
        <div className="w-full max-w-[450px] mx-auto">
          <InboxArrowDownIcon className="w-10 h-10 text-stone-500 mx-auto" />
          <p className=" font-bold font-serif text-stone-900 text-lg mt-4">
            Aún no tienes ninguna reserva.
          </p>
          <p className="text-sm text-stone-500 text-center mt-2">
            Aún no tienes ninguna reserva, puedes crear una nueva reserva
            pulsando en el botón de crear reserva, ¡animate a crear una!.
          </p>
        </div>
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
