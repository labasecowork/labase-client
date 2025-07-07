import * as client from "@/modules/client";
import { ROUTES } from "../routes";

export const clientRoutes = {
  path: "/client",
  children: [
    {
      path: ROUTES.Client.ViewReservations,
      element: <client.ViewReservationsPage />,
    },
    {
      path: ROUTES.Client.CreateReservation,
      element: <client.CreateReservationPage />,
    },
    {
      path: ROUTES.Client.ViewReservation,
      element: <client.ViewReservationPage />,
    },
  ],
};
