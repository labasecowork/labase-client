export const ROUTES = {
  Auth: {
    Login: "/login",
    Register: "/register",
    VerifyAccount: "/verify-account",
    RecoverPassword: "/recover-password",
    VerifyPasswordReset: "/verify-password-reset",
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
    SendNewsletter: "/admin/newsletter",
    ViewSpaces: "/admin/spaces",
    CreateSpace: "/admin/spaces/create",
    ViewSpace: "/admin/spaces/:id",
    EditSpace: "/admin/spaces/:id/edit",
  },

  Employee: {
    RegisterAttendance: "/employee/attendance/register",
  },

  Error: {
    NotFound: "*",
    Internal: "/500",
  },
};
