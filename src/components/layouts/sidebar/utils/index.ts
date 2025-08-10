import { ROUTES } from "@/routes/routes";
import {
  ClipboardDocumentListIcon,
  CreditCardIcon,
  UserGroupIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";
import type { NavigationItem } from "../types";

export const isActiveRoute = (
  navHref: string,
  currentPath: string
): boolean => {
  const cleanNavHref = navHref.replace(/\/:\w+/g, "");
  const cleanCurrentPath = currentPath;

  if (
    navHref === ROUTES.Admin.ViewAllReservations &&
    cleanCurrentPath.startsWith("/admin")
  ) {
    return (
      cleanCurrentPath === "/admin/reservations" ||
      cleanCurrentPath.startsWith("/admin/reservations/")
    );
  }

  if (
    navHref === ROUTES.Client.ViewReservations &&
    cleanCurrentPath.startsWith("/client")
  ) {
    return (
      cleanCurrentPath === "/client/reservations" ||
      cleanCurrentPath.startsWith("/client/reservations/")
    );
  }

  if (
    navHref === ROUTES.Employee.RegisterAttendance &&
    cleanCurrentPath.startsWith("/employee")
  ) {
    return (
      cleanCurrentPath === "/employee/attendance/register" ||
      cleanCurrentPath.startsWith("/employee/attendance/register/")
    );
  }

  return (
    cleanCurrentPath === cleanNavHref ||
    cleanCurrentPath.startsWith(cleanNavHref + "/")
  );
};

export const getNavigationConfig = (userType: string): NavigationItem[] => {
  const baseConfig = {
    admin: [
      {
        name: "Reservaciones",
        href: ROUTES.Admin.ViewAllReservations,
        icon: ClipboardDocumentListIcon,
        key: "reservations",
      },
      {
        name: "Empleados",
        href: ROUTES.Admin.ViewEmployees,
        icon: UserGroupIcon,
        key: "employees",
      },
      {
        name: "Herramientas",
        href: ROUTES.Admin.ViewTools,
        icon: WrenchIcon,
        key: "tools",
      },
    ],
    client: [
      {
        name: "Mis Reservas",
        href: ROUTES.Client.ViewReservations,
        icon: ClipboardDocumentListIcon,
        key: "my-reservations",
      },
      {
        name: "Mis pagos",
        href: ROUTES.Client.ViewPayments,
        icon: CreditCardIcon,
        key: "my-payments",
      },
    ],
    employee: [
      {
        name: "Asistencia",
        href: ROUTES.Employee.RegisterAttendance,
        icon: UserGroupIcon,
        key: "attendance",
      },
    ],
  };

  return baseConfig[userType as keyof typeof baseConfig] || [];
};
