import * as employee from "@/modules/employee";
import { ROUTES } from "../routes";

export const employeeRoutes = {
  path: "/employee",
  children: [
    {
      path: ROUTES.Employee.RegisterAttendance,
      element: <employee.RegisterAttendancePage />,
    },
  ],
};
