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
    PaymentSuccess: "/client/payment/success",
    PaymentError: "/client/payment/error",
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
    ViewEmployees: "/admin/employees",
    CreateEmployee: "/admin/employees/create",
    EditEmployee: "/admin/employees/:id/edit",
    ViewAttendances: "/admin/attendances",
    ViewArticles: "/admin/articles",
    CreateArticle: "/admin/articles/create",
    EditArticle: "/admin/articles/:id/edit",
    ViewTools: "/admin/tools",
  },

  Employee: {
    RegisterAttendance: "/employee/attendance/register",
  },

  Error: {
    NotFound: "*",
    Internal: "/500",
  },
};
