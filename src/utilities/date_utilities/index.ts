export const timeToMinutes = (time: string): number => {
  const match = time.match(/^(\d{1,2}):(\d{2})(am|pm)$/);
  if (!match) return 0;

  const [, hourStr, minuteStr, period] = match;
  let hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);

  // Convertir a formato 24 horas
  if (period === "am" && hour === 12) {
    hour = 0; // 12am = 00:00
  } else if (period === "pm" && hour !== 12) {
    hour += 12; // 1pm = 13:00, etc.
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
