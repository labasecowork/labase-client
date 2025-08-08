import type { Attendance } from "../types";

export const transformAttendanceData = (attendance: {
  attendances: Attendance[];
}) => {
  if (!attendance?.attendances) return [];

  const groupedByEmployeeAndDate: { [key: string]: Attendance[] } = {};

  attendance.attendances.forEach((record) => {
    const key = `${record.employee.user.id}-${record.date}`;
    if (!groupedByEmployeeAndDate[key]) {
      groupedByEmployeeAndDate[key] = [];
    }
    groupedByEmployeeAndDate[key].push(record);
  });

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
        time: record.check_time.substring(0, 5),
        type: record.type,
      })),
    };
  });
};

export const calculateGrandTotalHours = (
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
