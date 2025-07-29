import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoaderSplash } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { useAuth } from "@/hooks";

export default function GuestGuard() {
  const location = useLocation();
  const { token, user, isPending, isError } = useAuth();

  const currentPath = location.pathname;

  const isAuthRoute =
    currentPath.includes(ROUTES.Auth.Login) ||
    currentPath.includes(ROUTES.Auth.Register) ||
    currentPath.includes(ROUTES.Auth.RecoverPassword) ||
    currentPath.includes(ROUTES.Auth.ChangePassword);

  if (isError) {
    window.localStorage.removeItem("TOKEN_AUTH");
    window.localStorage.removeItem("USER_AUTH");

    if (currentPath.includes(ROUTES.Auth.Login)) {
      window.location.reload();
      return null;
    }

    return <Navigate to={ROUTES.Auth.Login} replace />;
  }

  if (token && isPending) return <LoaderSplash />;

  if (user?.userType) {
    if (isAuthRoute) {
      if (user.userType === "admin") {
        return <Navigate to={ROUTES.Admin.ViewAllReservations} replace />;
      }
      if (user.userType === "client") {
        return <Navigate to={ROUTES.Client.ViewReservations} replace />;
      }
    }
  }

  return <Outlet />;
}
