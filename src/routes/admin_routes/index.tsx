import * as admin from "@/modules/admin";
import { ROUTES } from "../routes";

export const adminRoutes = {
  path: "/admin",
  children: [
    {
      path: ROUTES.Admin.ViewCalendar,
      element: <admin.ViewCalendarPage />,
    },
    {
      path: ROUTES.Admin.ScanCodeQRReservation,
      element: <admin.ScanQRReservationsPage />,
    },
    {
      path: ROUTES.Admin.ViewDetailsReservation,
      element: <admin.ViewReservationPage />,
    },
    {
      path: ROUTES.Admin.ViewAllReservations,
      element: <admin.ViewAllReservationsPage />,
    },
    {
      path: ROUTES.Admin.SendNewsletter,
      element: <admin.SendNewsletterPage />,
    },
    {
      path: ROUTES.Admin.ViewSpaces,
      element: <admin.ViewSpacesPage />,
    },
    {
      path: ROUTES.Admin.CreateSpace,
      element: <admin.CreateSpacePage />,
    },
    {
      path: ROUTES.Admin.ViewSpace,
      element: <admin.ViewSpacePage />,
    },
    {
      path: ROUTES.Admin.EditSpace,
      element: <admin.EditSpacePage />,
    },
    {
      path: ROUTES.Admin.ViewEmployees,
      element: <admin.ViewEmployeePage />,
    },
  ],
};
