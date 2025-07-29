import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import type { Reservation } from "../../types";
import {
  BuildingIcon,
  CalendarIcon,
  ClockIcon,
  DollarSignIcon,
  TicketIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { formatDateToShort, formatTimeRange } from "@/utilities/date_utilities";
import { formatPrice } from "@/utilities/string_utilities";

interface ReservationTableProps {
  reservations: Reservation[];
}

export const ReservationTable = ({ reservations }: ReservationTableProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-stone-50 w-full mt-8"
      style={{ height: "calc(100vh - 250px)" }}
    >
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b border-stone-200">
            <TableHead className="w-[80px] px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <TicketIcon className="size-4" />
                ID
              </div>
            </TableHead>
            <TableHead className="w-[160px] px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <UserIcon className="size-4" />
                Cliente
              </div>
            </TableHead>
            <TableHead className="w-[80px] px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <CalendarIcon className="size-4" />
                Fecha
              </div>
            </TableHead>
            <TableHead className="w-[180px] px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <ClockIcon className="size-4" />
                Horario
              </div>
            </TableHead>
            <TableHead className="w-[80px] px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <UsersIcon className="size-4" />
                Personas
              </div>
            </TableHead>
            <TableHead className="w-[120px] px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <DollarSignIcon className="size-4" />
                Total
              </div>
            </TableHead>
            <TableHead className="w-[150px] px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <BuildingIcon className="size-4" />
                Espacio
              </div>
            </TableHead>
            <TableHead className="w-[130px] px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <BuildingIcon className="size-4" />
                Completo
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation, index) => (
            <TableRow
              key={reservation.id}
              onClick={() => {
                navigate(
                  `${ROUTES.Admin.ViewAllReservations}/${reservation.codeQr}`
                );
              }}
              className={`border-b border-stone-100 hover:bg-stone-100 cursor-pointer transition-colors ${
                index % 2 === 0 ? "bg-stone-50" : "bg-stone-50"
              }`}
            >
              <TableCell className="font-mono text-xs font-medium px-4 py-4 text-stone-600 truncate max-w-[100px]">
                ...{reservation.id.slice(-6)}
              </TableCell>
              <TableCell className="font-medium px-4 py-4 text-stone-900 truncate max-w-[140px] ">
                {reservation.user.first_name} {reservation.user.last_name}
              </TableCell>
              <TableCell className="px-4 py-4 text-stone-700 truncate max-w-[80px]">
                {formatDateToShort(reservation.createdAt)}
              </TableCell>
              <TableCell className="px-4 py-4 text-stone-700 truncate max-w-[180px]">
                {formatTimeRange(reservation.startTime, reservation.endTime)}
              </TableCell>
              <TableCell className="px-4 py-4 text-center font-medium text-stone-800 truncate max-w-[80px]">
                {reservation.people}
              </TableCell>
              <TableCell className="px-4 py-4 font-semibold text-stone-500 truncate max-w-[120px]">
                {formatPrice(reservation.price)}
              </TableCell>
              <TableCell className="px-4 py-4 text-stone-700 truncate max-w-[150px]">
                {reservation.space.name}
              </TableCell>
              <TableCell className="px-4 py-4 text-center truncate max-w-[130px]">
                <span
                  className={`inline-flex items-center px-2 py-1 text-xs font-medium transition-all `}
                >
                  {reservation.fullRoom ? "Sí" : "No"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
