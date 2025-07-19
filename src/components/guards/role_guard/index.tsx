import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks";
import { ROUTES } from "@/routes/routes";

export default function RoleGuard() {
  const { user } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  if (!user?.userType) return null;

  const isAdminRoute = path.startsWith("/admin");
  const isClientRoute = path.startsWith("/client");

  const canAccess =
    (user.userType === "admin" && isAdminRoute) ||
    (user.userType === "client" && isClientRoute);

  if (!canAccess) {
    const fallback =
      user.userType === "admin"
        ? ROUTES.Admin.ViewAllReservations
        : ROUTES.Client.ViewReservations;

    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
}
