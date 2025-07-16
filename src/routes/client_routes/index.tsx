import * as client from "@/modules/client";

export const clientRoutes = {
  path: "/client",
  children: [
    {
      path: "reservations",
      element: <client.ViewReservationsPage />,
    },
    {
      path: "reservations/create",
      element: <client.CreateReservationPage />,
    },
    {
      path: "reservations/code/:code",
      element: <client.ViewReservationPage />,
    },
  ],
};
