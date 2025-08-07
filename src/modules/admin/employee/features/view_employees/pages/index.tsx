import { Button, CustomHeader, AsyncBoundary } from "@/components/ui";
import { Link } from "react-router-dom";
import { ClockIcon, PlusIcon } from "lucide-react";
import { ROUTES } from "@/routes/routes";
import { getEmployees } from "../services";
import { useQuery } from "@tanstack/react-query";
import type { EmployeesResponse } from "../types";
import {
  EmployeeCard,
  EmptyState,
  ErrorState,
  LoadingState,
} from "../components";

export default function ViewEmployeesPage() {
  const { data, isLoading, isError } = useQuery<EmployeesResponse>({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  return (
    <div className="mx-auto max-w-5xl w-full px-4 mt-8">
      <div className="flex items-end justify-between mb-8">
        <CustomHeader title="Empleados" />
        <div className="flex items-center gap-2">
          <Link to={ROUTES.Admin.ViewAttendance}>
            <Button className="bg-stone-200 text-stone-700 hover:bg-stone-300">
              <ClockIcon className="w-4 h-4" />
              Asistencia
            </Button>
          </Link>
          <Link to={ROUTES.Admin.CreateEmployee}>
            <Button>
              <PlusIcon className="w-4 h-4" />
              Agregar empleado
            </Button>
          </Link>
        </div>
      </div>

      <AsyncBoundary
        isLoading={isLoading}
        isError={isError}
        data={data?.employees}
        LoadingComponent={<LoadingState />}
        ErrorComponent={<ErrorState />}
        EmptyComponent={<EmptyState />}
      >
        {(employees) => (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {employees.map((employee) => (
              <EmployeeCard key={employee.employee_id} employee={employee} />
            ))}
          </div>
        )}
      </AsyncBoundary>
    </div>
  );
}
