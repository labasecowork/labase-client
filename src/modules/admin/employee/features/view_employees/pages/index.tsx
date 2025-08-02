import {
  CustomHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  AsyncBoundary,
  StatusMessage,
} from "@/components/ui";
import { useTitle } from "@/hooks";
import {
  UsersIcon,
  ClockIcon,
  CalendarDaysIcon,
  UserIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  DocumentIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useMemo } from "react";
import { getAttendance } from "../services";
import { useQuery } from "@tanstack/react-query";
import type { Attendance } from "../types";
import { calculateTotalWorkedHours } from "@/utilities";

// ====================================================================
// UTILITY FUNCTIONS
// ====================================================================

const transformAttendanceData = (attendance: { attendances: Attendance[] }) => {
  if (!attendance?.attendances) return [];

  const groupedByEmployeeAndDate: { [key: string]: Attendance[] } = {};

  // Agrupar por empleado y fecha
  attendance.attendances.forEach((record) => {
    const key = `${record.employee.user.id}-${record.date}`;
    if (!groupedByEmployeeAndDate[key]) {
      groupedByEmployeeAndDate[key] = [];
    }
    groupedByEmployeeAndDate[key].push(record);
  });

  // Convertir a la estructura esperada
  return Object.entries(groupedByEmployeeAndDate).map(([, records]) => {
    const firstRecord = records[0];
    const date = new Date(firstRecord.date);
    const dayNames = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];

    return {
      employeeName: `${firstRecord.employee.user.first_name} ${firstRecord.employee.user.last_name}`,
      date: firstRecord.date,
      dayName: dayNames[date.getDay()],
      records: records.map((record) => ({
        id: parseInt(record.id),
        time: record.check_time.substring(0, 5), // Convertir "HH:MM:SS" a "HH:MM"
        type: record.type,
      })),
    };
  });
};

// 🏠 SE QUEDA AQUÍ: Cálculo específico para estadísticas de esta página
// Esta función es muy específica para las estadísticas de esta página
const calculateGrandTotalHours = (
  data: ReturnType<typeof transformAttendanceData>
) => {
  let grandTotalMinutes = 0;

  data.forEach((dayRecord) => {
    const entries = dayRecord.records
      .filter((r) => r.type === "ENTRY")
      .map((r) => r.time);
    const exits = dayRecord.records
      .filter((r) => r.type === "EXIT")
      .map((r) => r.time);

    for (let i = 0; i < entries.length; i++) {
      if (exits[i]) {
        const [entryHour, entryMin] = entries[i].split(":").map(Number);
        const [exitHour, exitMin] = exits[i].split(":").map(Number);

        const entryMinutes = entryHour * 60 + entryMin;
        const exitMinutes = exitHour * 60 + exitMin;

        grandTotalMinutes += exitMinutes - entryMinutes;
      }
    }
  });

  const hours = Math.floor(grandTotalMinutes / 60);
  const minutes = grandTotalMinutes % 60;

  return `${hours}h ${minutes}m`;
};

// ====================================================================
// COMPONENTES UI
// ====================================================================

// Componente de Loading State
const LoadingState = () => (
  <div className="h-[600px] bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
    <div className="text-gray-500">Cargando asistencias...</div>
  </div>
);

// Componente de Error State
const ErrorState = () => (
  <StatusMessage
    title="Error al cargar"
    description="No se pudieron cargar los registros de asistencia. Intenta nuevamente."
    icon={ExclamationTriangleIcon}
    color="rose"
  />
);

// Componente de Empty State
const EmptyState = () => (
  <StatusMessage
    title="Sin registros"
    description="No hay registros de asistencia disponibles en este momento."
    icon={DocumentIcon}
    color="stone"
  />
);

// Componente de Tarjeta de Estadística
interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  bgColor: string;
  iconColor: string;
  textColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  bgColor,
  iconColor,
  textColor,
}) => (
  <div className={`${bgColor} p-4`}>
    <div className="flex items-center gap-3">
      <div className={`p-4 ${bgColor}`}>
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <div>
        <p className={`text-sm ${textColor} font-medium`}>{title}</p>
        <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
      </div>
    </div>
  </div>
);

// Componente de Estadísticas
interface StatsGridProps {
  data: ReturnType<typeof transformAttendanceData>;
}

const StatsGrid: React.FC<StatsGridProps> = ({ data }) => (
  <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <StatsCard
      title="Días registrados"
      value={data.length}
      icon={ClockIcon}
      bgColor="bg-red-800/10"
      iconColor="text-red-800"
      textColor="text-red-800"
    />
    <StatsCard
      title="Total registros"
      value={data.reduce((total, emp) => total + emp.records.length, 0)}
      icon={ChartBarIcon}
      bgColor="bg-orange-800/10"
      iconColor="text-orange-800"
      textColor="text-orange-800"
    />
    <StatsCard
      title="Total horas"
      value={calculateGrandTotalHours(data)}
      icon={ClockIcon}
      bgColor="bg-amber-800/10"
      iconColor="text-amber-800"
      textColor="text-amber-800"
    />
    <StatsCard
      title="Total empleados"
      value={new Set(data.map((e) => e.employeeName)).size}
      icon={UsersIcon}
      bgColor="bg-yellow-800/10"
      iconColor="text-yellow-800"
      textColor="text-yellow-800"
    />
  </div>
);

// Componente de Encabezados de Tabla
const TableHeaders = () => (
  <TableHeader>
    <TableRow>
      <TableHead className="w-[200px] py-4 px-6 text-left">
        <div className="flex items-center gap-2 font-semibold text-stone-700">
          <UserIcon className="h-4 w-4" />
          Empleado
        </div>
      </TableHead>
      <TableHead className="w-[140px] py-4 px-4 text-center">
        <div className="flex items-center justify-center gap-2 font-semibold text-stone-700">
          <CalendarDaysIcon className="h-4 w-4" />
          Fecha
        </div>
      </TableHead>
      <TableHead className="w-[140px] py-4 px-4 text-center">
        <div className="flex items-center justify-center gap-2 font-semibold text-stone-700">
          <ChartBarIcon className="h-4 w-4" />
          Horas trabajadas
        </div>
      </TableHead>
      <TableHead className="w-[100px] py-4 px-4 text-center">
        <div className="flex items-center justify-center gap-2 font-semibold text-stone-700">
          <ClockIcon className="h-4 w-4" />
          Hora
        </div>
      </TableHead>
      <TableHead className="w-[120px] py-4 px-4 text-center">
        <div className="flex items-center justify-center gap-2 font-semibold text-stone-700">
          Tipo
        </div>
      </TableHead>
    </TableRow>
  </TableHeader>
);

// Componente de Fila de Asistencia
interface AttendanceRowProps {
  dayRecord: ReturnType<typeof transformAttendanceData>[0];
  record: ReturnType<typeof transformAttendanceData>[0]["records"][0];
  recordIndex: number;
}

const AttendanceRow: React.FC<AttendanceRowProps> = ({
  dayRecord,
  record,
  recordIndex,
}) => (
  <TableRow key={record.id}>
    {recordIndex === 0 ? (
      <TableCell
        rowSpan={dayRecord.records.length}
        className="py-4 px-6 bg-stone-50/60 border-r border-stone-200"
      >
        <div>
          <p className="font-medium text-stone-900">{dayRecord.employeeName}</p>
          <p className="text-xs text-stone-500">
            {dayRecord.records.length} registro
            {dayRecord.records.length !== 1 ? "s" : ""}
          </p>
        </div>
      </TableCell>
    ) : null}

    {recordIndex === 0 ? (
      <TableCell
        rowSpan={dayRecord.records.length}
        className="py-4 px-4 bg-stone-50/60 border-r border-stone-200 text-center"
      >
        <div className="space-y-1">
          <p className="font-medium text-stone-900 text-sm">
            {dayRecord.dayName}
          </p>
          <p className="text-xs text-stone-600">{dayRecord.date}</p>
        </div>
      </TableCell>
    ) : null}

    {recordIndex === 0 ? (
      <TableCell
        rowSpan={dayRecord.records.length}
        className="py-4 px-4 bg-stone-50/60 border-r border-stone-200 text-center"
      >
        <div className="font-mono text-sm font-semibold text-stone-700 bg-stone-100 px-2 py-1 inline-block">
          {calculateTotalWorkedHours(dayRecord.records)}
        </div>
      </TableCell>
    ) : null}

    <TableCell className="py-3 px-4 text-center border-r border-stone-200">
      <span className="font-mono text-sm font-medium text-stone-700">
        {record.time}
      </span>
    </TableCell>

    <TableCell className="py-3 px-4 text-center">
      <span
        className={`flex w-full items-center gap-1.5 px-3 py-1.5 text-xs font-medium justify-center ${
          record.type === "ENTRY"
            ? "bg-stone-100 text-stone-800"
            : "bg-orange-100 text-orange-800"
        }`}
      >
        {record.type === "ENTRY" ? "Entrada" : "Salida"}
      </span>
    </TableCell>
  </TableRow>
);

// Componente Principal de Tabla
interface EmployeeTableProps {
  data: ReturnType<typeof transformAttendanceData>;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ data }) => (
  <div className="bg-stone-50 overflow-hidden">
    <Table>
      <TableHeaders />
      <TableBody>
        {data.map((dayRecord) => (
          <>
            {dayRecord.records.map((record, recordIndex) => (
              <AttendanceRow
                key={record.id}
                dayRecord={dayRecord}
                record={record}
                recordIndex={recordIndex}
              />
            ))}
          </>
        ))}
      </TableBody>
    </Table>
  </div>
);

// ====================================================================
// COMPONENTE PRINCIPAL
// ====================================================================

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

  // Transformar datos usando la función utilitaria
  const employeeAttendance = useMemo(
    () => transformAttendanceData(attendance || { attendances: [] }),
    [attendance]
  );

  return (
    <div className="mx-auto max-w-5xl w-full px-4 py-8">
      <div className="mb-8">
        <CustomHeader title="Empleados" />
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
