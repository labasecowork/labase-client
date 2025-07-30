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
  const isEmployeeRoute = path.startsWith("/employee");

  const canAccess =
    (user.userType === "admin" && isAdminRoute) ||
    (user.userType === "client" && isClientRoute) ||
    (user.userType === "employee" && isEmployeeRoute);

  if (!canAccess) {
    const fallback =
      user.userType === "admin"
        ? ROUTES.Admin.ViewAllReservations
        : user.userType === "employee"
        ? ROUTES.Employee.RegisterAttendance
        : ROUTES.Client.ViewReservations;

    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
}
