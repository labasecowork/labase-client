import { Navigate, Outlet } from "react-router-dom";
import { LoaderSplash } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { useAuth } from "@/hooks";

export default function AuthGuard() {
  const { token, user, isPending, isError } = useAuth();

  if (!token || isError) {
    window.localStorage.removeItem("TOKEN_AUTH");
    return <Navigate to={ROUTES.Auth.Login} />;
  }

  if (isPending) return <LoaderSplash />;

  if (user?.userType === null) {
    return <Navigate to={ROUTES.Error.Internal} />;
  }

  return <Outlet />;
}
