import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import {
  QrCodeIcon,
  HashIcon,
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  DollarSignIcon,
  BuildingIcon,
  UserIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

// Lista de reservas de ejemplo
const reservations = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-1234567890ab",
    date: "2024-01-15",
    time: "10:00 - 10:30",
    people: 4,
    total: "$15.000",
    fullSpace: false,
    client: "Juan Pérez",
    space: "La brigada",
  },
  {
    id: "b2c3d4e5-f6g7-8901-bcde-234567890abc",
    date: "2024-01-16",
    time: "14:00 - 16:00",
    people: 8,
    total: "$45.000",
    fullSpace: true,
    client: "María González",
    space: "Recepción",
  },
  {
    id: "c3d4e5f6-g7h8-9012-cdef-34567890abcd",
    date: "2024-01-17",
    time: "09:00 - 11:30",
    people: 12,
    total: "$62.500",
    fullSpace: true,
    client: "Carlos Rodríguez",
    space: "Sala principal",
  },
  {
    id: "d4e5f6g7-h8i9-0123-def0-4567890abcde",
    date: "2024-01-18",
    time: "16:00 - 18:00",
    people: 6,
    total: "$28.000",
    fullSpace: false,
    client: "Ana López",
    space: "Terraza",
  },
  {
    id: "e5f6g7h8-i9j0-1234-ef01-567890abcdef",
    date: "2024-01-19",
    time: "11:00 - 13:00",
    people: 10,
    total: "$55.000",
    fullSpace: true,
    client: "Pedro Martínez",
    space: "La brigada",
  },
  {
    id: "f6g7h8i9-j0k1-2345-f012-67890abcdef0",
    date: "2024-01-20",
    time: "15:30 - 17:00",
    people: 3,
    total: "$12.500",
    fullSpace: false,
    client: "Laura Sánchez",
    space: "Recepción",
  },
  {
    id: "g7h8i9j0-k1l2-3456-0123-7890abcdef01",
    date: "2024-01-21",
    time: "08:00 - 10:00",
    people: 15,
    total: "$75.000",
    fullSpace: true,
    client: "Roberto Silva",
    space: "Sala principal",
  },
  {
    id: "h8i9j0k1-l2m3-4567-1234-890abcdef012",
    date: "2024-01-22",
    time: "13:00 - 14:30",
    people: 5,
    total: "$22.500",
    fullSpace: false,
    client: "Sofia Herrera",
    space: "Jardín",
  },
  {
    id: "i9j0k1l2-m3n4-5678-2345-90abcdef0123",
    date: "2024-01-23",
    time: "17:00 - 19:00",
    people: 9,
    total: "$48.000",
    fullSpace: false,
    client: "Diego Morales",
    space: "Terraza",
  },
  {
    id: "j0k1l2m3-n4o5-6789-3456-0abcdef01234",
    date: "2024-01-24",
    time: "10:30 - 12:00",
    people: 7,
    total: "$35.000",
    fullSpace: false,
    client: "Valentina Castro",
    space: "La brigada",
  },
  {
    id: "k1l2m3n4-o5p6-7890-4567-abcdef012345",
    date: "2024-01-25",
    time: "14:30 - 16:30",
    people: 11,
    total: "$58.000",
    fullSpace: true,
    client: "Andrés Jiménez",
    space: "Recepción",
  },
  {
    id: "l2m3n4o5-p6q7-8901-5678-bcdef0123456",
    date: "2024-01-26",
    time: "12:00 - 14:00",
    people: 4,
    total: "$18.000",
    fullSpace: false,
    client: "Camila Vargas",
    space: "Jardín",
  },
  {
    id: "m3n4o5p6-q7r8-9012-6789-cdef01234567",
    date: "2024-01-27",
    time: "09:30 - 11:00",
    people: 6,
    total: "$26.500",
    fullSpace: false,
    client: "Felipe Ruiz",
    space: "Sala principal",
  },
  {
    id: "n4o5p6q7-r8s9-0123-7890-def012345678",
    date: "2024-01-28",
    time: "16:30 - 18:30",
    people: 13,
    total: "$68.000",
    fullSpace: true,
    client: "Isabella Torres",
    space: "La brigada",
  },
  {
    id: "o5p6q7r8-s9t0-1234-8901-ef0123456789",
    date: "2024-01-29",
    time: "11:30 - 13:30",
    people: 8,
    total: "$42.000",
    fullSpace: false,
    client: "Sebastián Vega",
    space: "Terraza",
  },
  {
    id: "p6q7r8s9-t0u1-2345-9012-f01234567890",
    date: "2024-01-30",
    time: "15:00 - 17:30",
    people: 14,
    total: "$72.500",
    fullSpace: true,
    client: "Natalia Mendoza",
    space: "Recepción",
  },
  {
    id: "q7r8s9t0-u1v2-3456-0123-012345678901",
    date: "2024-01-31",
    time: "08:30 - 10:30",
    people: 5,
    total: "$23.000",
    fullSpace: false,
    client: "Alejandro Peña",
    space: "Jardín",
  },
  {
    id: "r8s9t0u1-v2w3-4567-1234-123456789012",
    date: "2024-02-01",
    time: "13:30 - 15:00",
    people: 9,
    total: "$46.500",
    fullSpace: false,
    client: "Daniela Ortiz",
    space: "Sala principal",
  },
  {
    id: "s9t0u1v2-w3x4-5678-2345-234567890123",
    date: "2024-02-02",
    time: "17:30 - 19:30",
    people: 12,
    total: "$65.000",
    fullSpace: true,
    client: "Mateo Guerrero",
    space: "La brigada",
  },
  {
    id: "t0u1v2w3-x4y5-6789-3456-345678901234",
    date: "2024-02-03",
    time: "10:00 - 12:30",
    people: 7,
    total: "$38.500",
    fullSpace: false,
    client: "Lucía Ramírez",
    space: "Terraza",
  },
  {
    id: "u1v2w3x4-y5z6-7890-4567-456789012345",
    date: "2024-02-04",
    time: "14:00 - 15:30",
    people: 3,
    total: "$14.500",
    fullSpace: false,
    client: "Gabriel Flores",
    space: "Recepción",
  },
  {
    id: "v2w3x4y5-z6a7-8901-5678-567890123456",
    date: "2024-02-05",
    time: "11:00 - 12:30",
    people: 6,
    total: "$29.000",
    fullSpace: false,
    client: "Mariana Aguilar",
    space: "Jardín",
  },
  {
    id: "w3x4y5z6-a7b8-9012-6789-678901234567",
    date: "2024-02-06",
    time: "16:00 - 18:00",
    people: 10,
    total: "$52.000",
    fullSpace: true,
    client: "Nicolás Delgado",
    space: "Sala principal",
  },
  {
    id: "x4y5z6a7-b8c9-0123-7890-789012345678",
    date: "2024-02-07",
    time: "09:00 - 11:00",
    people: 8,
    total: "$41.000",
    fullSpace: false,
    client: "Valeria Campos",
    space: "La brigada",
  },
  {
    id: "y5z6a7b8-c9d0-1234-8901-890123456789",
    date: "2024-02-08",
    time: "15:30 - 17:30",
    people: 11,
    total: "$57.500",
    fullSpace: true,
    client: "Emilio Rojas",
    space: "Terraza",
  },
  {
    id: "z6a7b8c9-d0e1-2345-9012-901234567890",
    date: "2024-02-09",
    time: "12:30 - 14:30",
    people: 4,
    total: "$19.000",
    fullSpace: false,
    client: "Regina Moreno",
    space: "Recepción",
  },
  {
    id: "a7b8c9d0-e1f2-3456-0123-012345678901",
    date: "2024-02-10",
    time: "18:00 - 20:00",
    people: 15,
    total: "$78.000",
    fullSpace: true,
    client: "Joaquín Restrepo",
    space: "Jardín",
  },
  {
    id: "b8c9d0e1-f2g3-4567-1234-123456789012",
    date: "2024-02-11",
    time: "08:00 - 09:30",
    people: 2,
    total: "$11.000",
    fullSpace: false,
    client: "Estefanía Ríos",
    space: "Sala principal",
  },
  {
    id: "c9d0e1f2-g3h4-5678-2345-234567890123",
    date: "2024-02-12",
    time: "13:00 - 15:30",
    people: 9,
    total: "$49.500",
    fullSpace: false,
    client: "Rodrigo Castillo",
    space: "La brigada",
  },
  {
    id: "d0e1f2g3-h4i5-6789-3456-345678901234",
    date: "2024-02-13",
    time: "16:30 - 18:00",
    people: 13,
    total: "$67.000",
    fullSpace: true,
    client: "Amanda Salazar",
    space: "Terraza",
  },
];

export default function ViewAllReservationsPage() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-stone-900">Reservas</h2>
        <Link
          to={ROUTES.Admin.ScanCodeQRReservation}
          className="bg-stone-200 flex items-center justify-center gap-2 text-stone-900 font-medium hover:bg-stone-300 transition-all text-sm px-8 py-3 rounded-full"
        >
          <QrCodeIcon className="size-4" />
          Escanear código QR
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <div className="flex items-center gap-2">
                <HashIcon className="size-4" />
                ID
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <UserIcon className="size-4" />
                Cliente
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <CalendarIcon className="size-4" />
                Fecha de reserva
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <ClockIcon className="size-4" />
                Horario
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <UsersIcon className="size-4" />
                Personas
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <DollarSignIcon className="size-4" />
                Total a pagar
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <BuildingIcon className="size-4" />
                Espacio
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <BuildingIcon className="size-4" />
                Espacio completo
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell className="font-medium">
                {reservation.id.slice(-3)}
              </TableCell>
              <TableCell>{reservation.client}</TableCell>
              <TableCell>{reservation.date}</TableCell>
              <TableCell>{reservation.time}</TableCell>
              <TableCell>{reservation.people}</TableCell>
              <TableCell>{reservation.total}</TableCell>
              <TableCell>{reservation.space}</TableCell>
              <TableCell>{reservation.fullSpace ? "Sí" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
