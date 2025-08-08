import {
  CustomHeader,
  AsyncBoundary,
  CardNavigation,
  Button,
} from "@/components/ui";
import { getEmployees } from "../services";
import { useQuery } from "@tanstack/react-query";
import type { EmployeesResponse } from "../types";
import {
  EmployeesTable,
  EmptyState,
  ErrorState,
  LoadingState,
} from "../components";
import { actions } from "../constants";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

export default function ViewEmployeesPage() {
  const { changeTitle } = useTitle();
  const { data, isLoading, isError } = useQuery<EmployeesResponse>({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  useEffect(() => {
    changeTitle("Empleados - La base");
  }, [changeTitle]);

  return (
    <div className="mx-auto max-w-5xl w-full px-4 mt-8">
      <div className="flex justify-between items-center">
        <CustomHeader title="Empleados" />
        <div className="flex items-center gap-2">
          <Link to={ROUTES.Admin.CreateEmployee}>
            <Button>
              <PlusIcon className="w-4 h-4" />
              Nuevo empleado
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6 my-4">
        {actions.map((action) => (
          <CardNavigation
            key={action.title}
            to={action.to}
            title={action.title}
            description={action.description}
            icon={action.icon}
          />
        ))}
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
          <div className="mb-8">
            <EmployeesTable employees={employees} />
          </div>
        )}
      </AsyncBoundary>
    </div>
  );
}
