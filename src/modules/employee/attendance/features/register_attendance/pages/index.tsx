import {
  Button,
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
  PlayIcon,
  StopIcon,
  ClockIcon,
  CalendarDaysIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { useEffect } from "react";

export default function ViewReservationPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Asistencias - Labase");
  }, [changeTitle]);

  const calculateWorkedHours = (records: { time: string; type: string }[]) => {
    const entrada = records.find((r) => r.type === "entrada");
    const salida = records.find((r) => r.type === "salida");

    if (!entrada || !salida) return "--";

    const [entradaHour, entradaMin] = entrada.time.split(":").map(Number);
    const [salidaHour, salidaMin] = salida.time.split(":").map(Number);

    const entradaMinutes = entradaHour * 60 + entradaMin;
    const salidaMinutes = salidaHour * 60 + salidaMin;

    const totalMinutes = salidaMinutes - entradaMinutes;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  // Datos de ejemplo para el historial de asistencias
  const attendanceHistory = [
    {
      date: "2024-01-15",
      dayName: "Lunes",
      records: [
        { time: "08:30", type: "entrada" },
        { time: "17:45", type: "salida" },
      ],
    },
    {
      date: "2024-01-16",
      dayName: "Martes",
      records: [
        { time: "08:25", type: "entrada" },
        { time: "18:00", type: "salida" },
      ],
    },
    {
      date: "2024-01-17",
      dayName: "Miércoles",
      records: [
        { time: "08:35", type: "entrada" },
        // Solo entrada, sin salida aún
      ],
    },
  ];
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <CustomHeader title="Asistencias" />

      <div className="mt-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex justify-center items-center">
            <Button className="flex items-center gap-2 flex-col h-[200px] sm:h-[300px] bg-stone-800/50 text-white rounded-none w-full hover:bg-stone-800/70 text-sm md:text-base">
              <PlayIcon className="size-10 md:size-16" />
              Registrar entrada
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <Button className="flex items-center gap-2 flex-col h-[200px] sm:h-[300px] bg-orange-800/50 text-white rounded-none w-full hover:bg-orange-800/70 text-sm md:text-base">
              <StopIcon className="size-10 md:size-16" />
              Registrar salida
            </Button>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-serif text-stone-900 font-bold mb-6">
            Historial de asistencias
          </h2>

          <div className="rounded-none bg-stone-50">
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
                {attendanceHistory.map((day, dayIndex) => (
                  <>
                    {day.records.map((record, recordIndex) => (
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
                                {calculateWorkedHours(day.records)}
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
      </div>
    </div>
  );
}
