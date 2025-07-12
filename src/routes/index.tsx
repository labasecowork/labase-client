import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "@/routes/auth_routes";
import { errorRoutes } from "@/routes/error_routes";
import { appRoutes } from "./app_routes";
import { clientRoutes } from "./client_routes";
import { adminRoutes } from "./admin_routes";

const routes = [adminRoutes];
const router = createBrowserRouter(routes);
export default router;
