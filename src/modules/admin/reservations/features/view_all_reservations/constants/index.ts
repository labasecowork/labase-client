import { ROUTES } from "@/routes/routes";
import { QrCodeIcon } from "lucide-react";
import { CalendarIcon } from "lucide-react";
import { Building2Icon } from "lucide-react";

export const actions = [
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
