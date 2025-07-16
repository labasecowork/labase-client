import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import {
  BuildingIcon,
  CalendarIcon,
  ClockIcon,
  DollarSignIcon,
  TicketIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { reservations } from "../../constants";
export const ReservationTable = () => {
  return (
    <Table>
      <TableHeader className="">
        <TableRow className="border-b border-stone-200">
          <TableHead className="w-[80px] px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <TicketIcon className="size-4" />
              ID
            </div>
          </TableHead>
          <TableHead className="w-[180px] px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <UserIcon className="size-4" />
              Cliente
            </div>
          </TableHead>
          <TableHead className="w-[140px] px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <CalendarIcon className="size-4" />
              Fecha
            </div>
          </TableHead>
          <TableHead className="w-[160px] px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <ClockIcon className="size-4" />
              Horario
            </div>
          </TableHead>
          <TableHead className="w-[100px] px-4 py-4">
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
            className={`border-b border-stone-100 hover:bg-stone-100 cursor-pointer transition-colors ${
              index % 2 === 0 ? "bg-stone-50" : "bg-stone-50"
            }`}
          >
            <TableCell className="font-mono text-sm font-medium px-4 py-4 text-stone-600">
              ...{reservation.id.slice(-6)}
            </TableCell>
            <TableCell className="font-medium px-4 py-4 text-stone-900">
              {reservation.client}
            </TableCell>
            <TableCell className="px-4 py-4 text-stone-700">
              {reservation.date}
            </TableCell>
            <TableCell className="px-4 py-4 text-stone-700">
              {reservation.time}
            </TableCell>
            <TableCell className="px-4 py-4 text-center font-medium text-stone-800">
              {reservation.people}
            </TableCell>
            <TableCell className="px-4 py-4 font-semibold text-stone-500">
              {reservation.total}
            </TableCell>
            <TableCell className="px-4 py-4 text-stone-700">
              {reservation.space}
            </TableCell>
            <TableCell className="px-4 py-4 text-center">
              <span
                className={`inline-flex items-center px-2 py-1 text-xs font-medium transition-all `}
              >
                {reservation.fullSpace ? "Sí" : "No"}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
