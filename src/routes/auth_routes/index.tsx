import * as publicPages from "@/modules/shared";
import * as guard from "@/components/guards";
import { AuthLayout } from "@/components/layouts";
import { ROUTES } from "@/routes/routes";
import { Navigate } from "react-router-dom";

export const authRoutes = {
  path: "/",
  element: <guard.GuestGuard />,
  children: [
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/",
          element: <Navigate to={ROUTES.Auth.Login} replace />,
        },
        {
          path: ROUTES.Auth.Login,
          element: <publicPages.LoginPage />,
        },
        {
          path: ROUTES.Auth.Register,
          element: <publicPages.RegisterPage />,
        },
        {
          path: ROUTES.Auth.VerifyAccount,
          element: <publicPages.VerifyAccountPage />,
        },
        {
          path: ROUTES.Auth.RecoverPassword,
          element: <publicPages.RecoverPasswordPage />,
        },
        {
          path: ROUTES.Auth.VerifyPasswordReset,
          element: <publicPages.VerifyPasswordResetPage />,
        },
        {
          path: ROUTES.Auth.ChangePassword,
          element: <publicPages.ChangePasswordPage />,
        },
      ],
    },
  ],
};
