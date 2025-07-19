import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import {
  MailIcon,
  UserIcon,
  CalendarIcon,
  CheckCircleIcon,
} from "lucide-react";
import { subscribedEmails } from "../../constants";

export const SubscribersTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-stone-200">
          <TableHead className="w-[80px] px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <CheckCircleIcon className="size-4" />
              ID
            </div>
          </TableHead>
          <TableHead className="w-[280px] px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <MailIcon className="size-4" />
              Email
            </div>
          </TableHead>
          <TableHead className="w-[180px] px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <UserIcon className="size-4" />
              Nombre
            </div>
          </TableHead>
          <TableHead className="w-[140px] px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <CalendarIcon className="size-4" />
              Fecha de suscripción
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {subscribedEmails.map((subscriber, index) => (
          <TableRow
            key={subscriber.id}
            className={`border-b border-stone-100 hover:bg-stone-100 transition-colors ${
              index % 2 === 0 ? "bg-stone-50" : "bg-white"
            }`}
          >
            <TableCell className="font-mono text-sm font-medium px-4 py-4 text-stone-600">
              #{subscriber.id}
            </TableCell>
            <TableCell className="font-medium px-4 py-4 text-stone-900">
              {subscriber.email}
            </TableCell>
            <TableCell className="px-4 py-4 text-stone-700">
              {subscriber.name}
            </TableCell>
            <TableCell className="px-4 py-4 text-stone-700">
              {new Date(subscriber.subscriptionDate).toLocaleDateString(
                "es-ES"
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
