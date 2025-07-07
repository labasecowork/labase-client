export const ROUTES = {
  Auth: {
    Login: "/login",
    Register: "/register",
    RecoverPassword: "/recover-password",
    ChangePassword: "/change-password",
  },

  Client: {
    ViewReservations: "/client/reservations",
    CreateReservation: "/client/reservations/create",
    ViewReservation: "/client/reservations/:id",
  },

  Admin: {
    ViewCalendar: "/admin/calendar",
    ViewAllReservations: "/admin/reservations",
    ViewDetailsReservation: "/admin/reservations/:id",
    ScanCodeQRReservation: "/admin/reservations/scan-qr",
  },

  Error: {
    NotFound: "*",
    Internal: "/500",
  },
};
