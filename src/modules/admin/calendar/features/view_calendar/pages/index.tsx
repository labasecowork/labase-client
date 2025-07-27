import { formatDate } from "@/utilities";
import { Calendar } from "../components";
import { useEffect } from "react";
import { useTitle } from "@/hooks";
import { CustomHeader } from "@/components/ui";
import { useGetCalendar } from "../service";

// Función para mapear los eventos del tipo original al tipo que espera el componente Calendar
const mapEventsForCalendar = (
  events: Array<{
    id: string;
    space: string;
    cliente: string;
    startTime: string;
    endTime: string;
    day: number;
  }>
) => {
  return events.map((event) => ({
    id: event.id,
    title: event.space,
    subtitle: event.cliente,
    startTime: event.startTime,
    endTime: event.endTime,
    day: event.day,
  }));
};

export default function ViewCalendarPage() {
  const currentDate = new Date();
  const { changeTitle } = useTitle();
  const { data: calendarData, isLoading, isError } = useGetCalendar();

  useEffect(() => {
    changeTitle("Calendario - La base");
  }, []);

  useEffect(() => {
    console.log(calendarData);
  }, [calendarData]);

  if (isLoading || isError || !calendarData) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-8">
        <CustomHeader title={`Calendario - ${formatDate(currentDate)}`} />
        <div className="w-full mt-8 h-[calc(100vh-14rem)] bg-stone-50 min-h-[600px]">
          <div className="w-full animate-pulse bg-stone-50 h-[500px] mt-8"></div>
        </div>
      </div>
    );
  }

  if (isError || !calendarData) {
    return <h2>Error</h2>;
  }

  // Convertir los eventos al formato que espera el componente Calendar
  const mappedEvents = mapEventsForCalendar(calendarData);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <CustomHeader title={`Calendario - ${formatDate(currentDate)}`} />
      <div className="w-full mt-8 h-[calc(100vh-14rem)] bg-stone-50 min-h-[600px]">
        <Calendar events={mappedEvents} />
      </div>
    </div>
  );
}
