import { CustomHeader, AsyncBoundary } from "@/components/ui";
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
import { ROUTES } from "@/routes/routes";

export default function ViewAttendancePage() {
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
        <CustomHeader title="Asistencia" to={ROUTES.Admin.ViewEmployees} />
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
