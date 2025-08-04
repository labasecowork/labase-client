import { CustomHeader, AsyncBoundary, Button } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect, useMemo } from "react";
import { getAttendance } from "../services";
import { useQuery } from "@tanstack/react-query";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  StatsGrid,
  EmployeeTable,
} from "../components";
import { transformAttendanceData } from "../utils";
import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

export default function ViewEmployeesPage() {
  const { changeTitle } = useTitle();
  const {
    data: attendance,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["attendance"],
    queryFn: getAttendance,
  });

  useEffect(() => {
    changeTitle("Empleados - Labase");
  }, [changeTitle]);

  const employeeAttendance = useMemo(
    () => transformAttendanceData(attendance || { attendances: [] }),
    [attendance]
  );

  return (
    <div className="mx-auto max-w-5xl w-full px-4 mt-8">
      <div className="mb-8 flex items-center justify-between">
        <CustomHeader title="Empleados" />
        <Link to="/admin/employees/create">
          <Button>
            <PlusIcon className="w-4 h-4" />
            Agregar empleado
          </Button>
        </Link>
      </div>

      <AsyncBoundary
        isLoading={isPending}
        isError={isError}
        data={employeeAttendance}
        LoadingComponent={<LoadingState />}
        ErrorComponent={<ErrorState />}
        EmptyComponent={<EmptyState />}
      >
        {(data) => (
          <>
            <StatsGrid data={data} />
            <EmployeeTable data={data} />
          </>
        )}
      </AsyncBoundary>
    </div>
  );
}
