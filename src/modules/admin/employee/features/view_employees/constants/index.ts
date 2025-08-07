import { ROUTES } from "@/routes/routes";
import { Clock, UserPlus } from "lucide-react";

export const actions = [
  {
    title: "Agregar un empleado",
    description:
      "Con esto podras crear un empleado para que tenga acceso al sistema.",
    icon: UserPlus,
    to: ROUTES.Admin.CreateEmployee,
  },
  {
    title: "Ver asistencia",
    description: "Con esto podras ver la asistencia de los empleados.",
    icon: Clock,
    to: ROUTES.Admin.ViewAttendance,
  },
];
