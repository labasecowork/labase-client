import {
  CustomHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { useTitle } from "@/hooks";
import {
  UsersIcon,
  ClockIcon,
  CalendarDaysIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { useEffect } from "react";

export default function ViewEmployeePage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Empleados - Labase");
  }, [changeTitle]);

  const calculateTotalWorkedHours = (
    records: { time: string; type: string }[]
  ) => {
    const entries = records
      .filter((r) => r.type === "entrada")
      .map((r) => r.time);
    const exits = records.filter((r) => r.type === "salida").map((r) => r.time);

    if (entries.length === 0) return "--";

    let totalMinutes = 0;

    // Calculamos las horas por cada par entrada-salida
    for (let i = 0; i < entries.length; i++) {
      if (exits[i]) {
        // Solo si hay salida correspondiente
        const [entryHour, entryMin] = entries[i].split(":").map(Number);
        const [exitHour, exitMin] = exits[i].split(":").map(Number);

        const entryMinutes = entryHour * 60 + entryMin;
        const exitMinutes = exitHour * 60 + exitMin;

        totalMinutes += exitMinutes - entryMinutes;
      }
    }

    if (totalMinutes === 0) return "--";

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  const calculateGrandTotalHours = () => {
    let grandTotalMinutes = 0;

    employeeAttendance.forEach((dayRecord) => {
      const entries = dayRecord.records
        .filter((r) => r.type === "entrada")
        .map((r) => r.time);
      const exits = dayRecord.records
        .filter((r) => r.type === "salida")
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

  // Datos de ejemplo con múltiples entradas/salidas por día
  const employeeAttendance = [
    {
      employeeName: "María González",
      date: "2024-01-15",
      dayName: "Lunes",
      records: [
        { id: 1, time: "08:30", type: "entrada" },
        { id: 2, time: "12:00", type: "salida" },
        { id: 3, time: "13:00", type: "entrada" },
        { id: 4, time: "17:45", type: "salida" },
      ],
    },
    {
      employeeName: "Carlos Rodríguez",
      date: "2024-01-15",
      dayName: "Lunes",
      records: [
        { id: 5, time: "08:25", type: "entrada" },
        { id: 6, time: "18:00", type: "salida" },
      ],
    },
    {
      employeeName: "Ana López",
      date: "2024-01-15",
      dayName: "Lunes",
      records: [
        { id: 7, time: "09:00", type: "entrada" },
        { id: 8, time: "12:30", type: "salida" },
        { id: 9, time: "13:30", type: "entrada" },
        // No ha marcado salida aún
      ],
    },
    {
      employeeName: "José Martínez",
      date: "2024-01-15",
      dayName: "Lunes",
      records: [
        { id: 10, time: "08:45", type: "entrada" },
        { id: 11, time: "11:00", type: "salida" },
        { id: 12, time: "11:15", type: "entrada" },
        { id: 13, time: "17:30", type: "salida" },
      ],
    },
    {
      employeeName: "María González",
      date: "2024-01-16",
      dayName: "Martes",
      records: [
        { id: 14, time: "08:35", type: "entrada" },
        { id: 15, time: "17:50", type: "salida" },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-5xl w-full px-4 py-8">
      <CustomHeader title="Empleados" />

      {/* Estadísticas rápidas */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-red-800/10   p-4">
          <div className="flex items-center gap-3">
            <div className="p-4 bg-red-800/10 ">
              <ClockIcon className="h-6 w-6 text-red-800" />
            </div>
            <div>
              <p className="text-sm text-red-800 font-medium">
                Días registrados
              </p>
              <p className="text-2xl font-bold text-red-800">
                {employeeAttendance.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-orange-800/10  p-4">
          <div className="flex items-center gap-3">
            <div className="p-4 bg-orange-800/10 ">
              <ChartBarIcon className="h-6 w-6 text-orange-800" />
            </div>
            <div>
              <p className="text-sm text-orange-800 font-medium">
                Total registros
              </p>
              <p className="text-2xl font-bold text-orange-800">
                {employeeAttendance.reduce(
                  (total, emp) => total + emp.records.length,
                  0
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-800/10  p-4">
          <div className="flex items-center gap-3">
            <div className="p-4 bg-amber-800/10 ">
              <ClockIcon className="h-6 w-6 text-amber-800" />
            </div>
            <div>
              <p className="text-sm text-amber-800 font-medium">Total horas</p>
              <p className="text-2xl font-bold text-amber-800">
                {calculateGrandTotalHours()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-800/10  p-4">
          <div className="flex items-center gap-3">
            <div className="p-4 bg-yellow-800/10 ">
              <UsersIcon className="h-6 w-6 text-yellow-800" />
            </div>
            <div>
              <p className="text-sm text-yellow-800 font-medium">
                Total empleados
              </p>
              <p className="text-2xl font-bold text-yellow-800">
                {new Set(employeeAttendance.map((e) => e.employeeName)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de asistencias */}
      <div className="bg-stone-50 overflow-hidden">
        <Table>
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
          <TableBody>
            {employeeAttendance.map((dayRecord) => (
              <>
                {dayRecord.records.map((record, recordIndex) => (
                  <TableRow key={record.id}>
                    {recordIndex === 0 ? (
                      <TableCell
                        rowSpan={dayRecord.records.length}
                        className="py-4 px-6 bg-stone-50/60 border-r border-stone-200"
                      >
                        <div>
                          <p className="font-medium text-stone-900">
                            {dayRecord.employeeName}
                          </p>
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
                          <p className="text-xs text-stone-600">
                            {dayRecord.date}
                          </p>
                        </div>
                      </TableCell>
                    ) : null}

                    {recordIndex === 0 ? (
                      <TableCell
                        rowSpan={dayRecord.records.length}
                        className="py-4 px-4 bg-stone-50/60 border-r border-stone-200 text-center"
                      >
                        <div className="font-mono text-sm font-semibold text-stone-700 bg-stone-100 px-2 py-1  inline-block">
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
                        className={`flex w-full items-center gap-1.5 px-3 py-1.5 text-xs font-medium justify-center  ${
                          record.type === "entrada"
                            ? "bg-stone-100 text-stone-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {record.type.charAt(0).toUpperCase() +
                          record.type.slice(1)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
