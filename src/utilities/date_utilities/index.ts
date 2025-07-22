export const timeToMinutes = (time: string): number => {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);
  if (!match) {
    console.error(`Formato de hora no válido: "${time}"`);
    return 0;
  }

  const [, hourStr, minuteStr, period] = match;
  let hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);

  if (period === "am" && hour === 12) {
    hour = 0;
  } else if (period === "pm" && hour !== 12) {
    hour += 12;
  }

  return hour * 60 + minute;
};

export const convertTimeToISO = (date: Date, time: string): string => {
  const timeMinutes = timeToMinutes(time);
  const hours = Math.floor(timeMinutes / 60);
  const minutes = timeMinutes % 60;

  const newDate = new Date(date);
  newDate.setHours(hours, minutes, 0, 0);

  return newDate.toISOString();
};

export const formatDate = (date: Date) => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const formatTimeTo12Hours = (isoString: string): string => {
  const date = new Date(isoString);
  return date
    .toLocaleTimeString("es-ES", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();
};

export const formatTimeRange = (startTime: string, endTime: string): string => {
  return `${formatTimeTo12Hours(startTime)} - ${formatTimeTo12Hours(endTime)}`;
};

export const formatDateToShort = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};
