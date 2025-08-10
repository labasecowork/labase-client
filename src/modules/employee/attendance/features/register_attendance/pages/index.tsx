import {
  AsyncBoundary,
  Button,
  CustomHeader,
  StatusMessage,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { useTitle } from "@/hooks";
import {
  PlayIcon,
  StopIcon,
  ClockIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  InboxIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useMemo } from "react";
import { getAttendance, registerAttendance } from "../services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Attendance } from "../types";
import { toast } from "sonner";
import { calculateTotalWorkedHours } from "@/utilities/date_utilities";

interface AttendanceRecord {
  time: string;
  type: string;
}

interface AttendanceDay {
  date: string;
  dayName: string;
  records: AttendanceRecord[];
}

export default function ViewReservationPage() {
  const { changeTitle } = useTitle();
  const {
    data: attendance,
    isPending: isLoading,
    isError,
  } = useQuery({
    queryKey: ["attendance"],
    queryFn: getAttendance,
  });

  const queryClient = useQueryClient();

  const { mutate: registerAttendanceMutation, isPending: isRegistering } =
    useMutation({
      mutationFn: registerAttendance,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["attendance"] });
        toast.success("Asistencia registrada correctamente", {
          description:
            "La asistencia se ha registrado correctamente, gracias por asistir.",
        });
      },
      onError: () => {
        toast.error("Error al registrar asistencia", {
          description:
            "Recuerda no marcar dos veces el mismo tipo de asistencia.",
        });
      },
    });

  const handleRegisterAttendance = (type: "EXIT" | "ENTRY") => {
    registerAttendanceMutation({ type });
  };

  useEffect(() => {
    changeTitle("Asistencias - Labase");
  }, [changeTitle]);

  const getDayName = (dateString: string) => {
    const days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const date = new Date(dateString + "T00:00:00");
    return days[date.getDay()];
  };

  // Transformar los datos de attendance agrupados por fecha
  const attendanceHistory = useMemo(() => {
    if (!attendance?.attendances) return [];

    const groupedByDate = attendance.attendances.reduce(
      (acc: Record<string, AttendanceDay>, record: Attendance) => {
        const date = record.date;
        if (!acc[date]) {
          acc[date] = {
            date,
            dayName: getDayName(date),
            records: [],
          };
        }
        acc[date].records.push({
          time: record.check_time.substring(0, 5), // Obtener solo HH:MM
          type: record.type,
        });
        return acc;
      },
      {}
    );

    return Object.values(groupedByDate).sort(
      (a: AttendanceDay, b: AttendanceDay) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [attendance]);
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <CustomHeader title="Asistencias" />

      <div className="mt-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex justify-center items-center">
            <Button
              className="flex items-center gap-2 flex-col h-[200px] sm:h-[300px] bg-stone-800/50 text-white rounded-sm w-full hover:bg-stone-800/70 text-sm md:text-base"
              onClick={() => handleRegisterAttendance("ENTRY")}
              disabled={isRegistering}
            >
              <PlayIcon className="size-10 md:size-16" />
              {isRegistering ? "Registrando entrada..." : "Registrar entrada"}
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <Button
              className="flex items-center gap-2 flex-col h-[200px] sm:h-[300px] bg-orange-800/50 text-white rounded-sm w-full hover:bg-orange-800/70 text-sm md:text-base"
              onClick={() => handleRegisterAttendance("EXIT")}
              disabled={isRegistering}
            >
              <StopIcon className="size-10 md:size-16" />
              {isRegistering ? "Registrando salida..." : "Registrar salida"}
            </Button>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-serif text-stone-900 font-bold mb-6">
            Historial de asistencias
          </h2>

          <AsyncBoundary
            isLoading={isLoading}
            isError={isError}
            data={attendanceHistory}
            LoadingComponent={
              <div className="h-[600px] flex items-center justify-center bg-stone-50 animate-pulse"></div>
            }
            ErrorComponent={
              <div className="h-[600px]">
                <StatusMessage
                  title="Error al cargar asistencias"
                  description="Hubo un problema al obtener los datos de asistencias. Por favor, inténtalo de nuevo."
                  icon={ExclamationTriangleIcon}
                  color="rose"
                />
              </div>
            }
            EmptyComponent={
              <div className="h-[600px]">
                <StatusMessage
                  title="Sin registros de asistencia"
                  description="No tienes registros de asistencia aún. ¡Comienza registrando tu entrada!"
                  icon={InboxIcon}
                  color="stone"
                />
              </div>
            }
          >
            {(attendanceData) => (
              <div className="rounded-sm bg-stone-50">
                <Table className="table-fixed">
                  <TableHeader>
                    <TableRow className="bg-stone-50/80">
                      <TableHead className="w-[220px] py-4 text-center">
                        <div className="flex items-center justify-center gap-2 font-semibold">
                          <CalendarDaysIcon className="size-4 text-stone-600" />
                          Día
                        </div>
                      </TableHead>
                      <TableHead className="w-[180px] py-4 text-center">
                        <div className="flex items-center justify-center gap-2 font-semibold">
                          <ChartBarIcon className="size-4 text-stone-600" />
                          Horas trabajadas
                        </div>
                      </TableHead>
                      <TableHead className="w-[120px] py-4 text-center">
                        <div className="flex items-center justify-center gap-2 font-semibold">
                          <ClockIcon className="size-4 text-stone-600" />
                          Hora
                        </div>
                      </TableHead>
                      <TableHead className="w-[140px] py-4 text-center">
                        <div className="flex items-center justify-center gap-2 font-semibold">
                          <PlayIcon className="size-4 text-stone-600" />
                          Tipo
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceData.map(
                      (day: AttendanceDay, dayIndex: number) => (
                        <>
                          {day.records.map(
                            (record: AttendanceRecord, recordIndex: number) => (
                              <TableRow
                                key={`${dayIndex}-${recordIndex}`}
                                className={`hover:bg-stone-50/50 ${
                                  recordIndex === 0 && dayIndex > 0
                                    ? "border-t border-stone-200"
                                    : ""
                                }`}
                              >
                                {recordIndex === 0 ? (
                                  <TableCell
                                    rowSpan={day.records.length}
                                    className="py-6 px-4 bg-stone-50/60 border-r border-stone-200 text-center align-middle"
                                  >
                                    <div className="space-y-1">
                                      <div className="font-semibold text-stone-900 text-sm">
                                        {day.dayName}
                                      </div>
                                      <div className="text-xs text-stone-600 font-medium">
                                        {day.date}
                                      </div>
                                    </div>
                                  </TableCell>
                                ) : null}
                                {recordIndex === 0 ? (
                                  <TableCell
                                    rowSpan={day.records.length}
                                    className="py-6 px-4 bg-stone-50/60 border-r border-stone-200 text-center align-middle"
                                  >
                                    <div className="flex items-center justify-center gap-2">
                                      <span className="font-mono text-sm font-semibold text-stone-700">
                                        {calculateTotalWorkedHours(day.records)}
                                      </span>
                                    </div>
                                  </TableCell>
                                ) : null}
                                <TableCell className="py-4 px-4 text-center align-middle border-r border-stone-200">
                                  <span className="font-mono text-sm font-medium text-stone-700">
                                    {record.time}
                                  </span>
                                </TableCell>
                                <TableCell className="py-4 px-4 text-center align-middle">
                                  <span
                                    className={`flex w-full items-center gap-1.5 px-3 py-1.5 text-xs font-medium justify-center ${
                                      record.type === "ENTRY"
                                        ? "bg-stone-100 text-stone-800"
                                        : "bg-orange-100 text-orange-800"
                                    }`}
                                  >
                                    {record.type === "ENTRY"
                                      ? "Entrada"
                                      : "Salida"}
                                  </span>
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </>
                      )
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </AsyncBoundary>
        </div>
      </div>
    </div>
  );
}
