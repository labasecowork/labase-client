import { ROUTES } from "@/routes/routes";
import {
  CalendarIcon,
  ClipboardDocumentListIcon,
  NewspaperIcon,
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

  return (
    cleanCurrentPath === cleanNavHref ||
    cleanCurrentPath.startsWith(cleanNavHref + "/")
  );
};

export const getNavigationConfig = (userType: string): NavigationItem[] => {
  const baseConfig = {
    admin: [
      {
        name: "Calendario",
        href: ROUTES.Admin.ViewCalendar,
        icon: CalendarIcon,
        key: "calendar",
      },
      {
        name: "Reservaciones",
        href: ROUTES.Admin.ViewAllReservations,
        icon: ClipboardDocumentListIcon,
        key: "reservations",
      },
      {
        name: "Newsletter",
        href: ROUTES.Admin.SendNewsletter,
        icon: NewspaperIcon,
        key: "newsletter",
      },
    ],
    client: [
      {
        name: "Mis Reservas",
        href: ROUTES.Client.ViewReservations,
        icon: ClipboardDocumentListIcon,
        key: "my-reservations",
      },
    ],
  };

  return baseConfig[userType as keyof typeof baseConfig] || [];
};
