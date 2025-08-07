import { CustomHeader, AsyncBoundary, CardNavigation } from "@/components/ui";
import { getEmployees } from "../services";
import { useQuery } from "@tanstack/react-query";
import type { EmployeesResponse } from "../types";
import {
  EmployeeCard,
  EmptyState,
  ErrorState,
  LoadingState,
} from "../components";
import { actions } from "../constants";
import { useTitle } from "@/hooks";
import { useEffect } from "react";

export default function ViewEmployeesPage() {
  const { changeTitle } = useTitle();
  const { data, isLoading, isError } = useQuery<EmployeesResponse>({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  useEffect(() => {
    changeTitle("Empleados - La base");
  }, []);

  return (
    <div className="mx-auto max-w-5xl w-full px-4 mt-8">
      <CustomHeader title="Empleados" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
            {employees.map((employee) => (
              <EmployeeCard key={employee.employee_id} employee={employee} />
            ))}
          </div>
        )}
      </AsyncBoundary>
    </div>
  );
}
