import { formatDate } from "@/utilities";
import { Calendar } from "../components";
import { useEffect, useState } from "react";
import { useTitle } from "@/hooks";
import { CustomHeader } from "@/components/ui";
import { useGetCalendar } from "../service";
import { socket } from "@/lib/socket";
import type { Event } from "@/types";

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
): Event[] => {
  return events.map((event) => ({
    id: event.id,
    title: event.space,
    startTime: event.startTime,
    endTime: event.endTime,
    day: event.day,
    color: "stone",
  }));
};

export default function ViewCalendarPage() {
  const currentDate = new Date();
  const { changeTitle } = useTitle();
  const { data: calendarData, isLoading, isError } = useGetCalendar();
  const [allEvents, setAllEvents] = useState<Event[]>([]);

  // Función para obtener la semana actual
  const getCurrentWeek = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);

    // Ajustar para que Lunes sea el primer día (getDay() devuelve 0 para Domingo)
    const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay;
    monday.setDate(today.getDate() + daysToMonday);

    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      week.push(day);
    }

    return week;
  };

  // Actualizar eventos cuando llegan los datos de la API
  useEffect(() => {
    if (calendarData) {
      const mappedEvents = mapEventsForCalendar(calendarData);
      setAllEvents(mappedEvents);
    }
  }, [calendarData]);

  // Escuchar websockets para nuevos eventos
  useEffect(() => {
    const currentWeek = getCurrentWeek();

    const onNewReservation = (reservation: {
      reservationId: string;
      spaceName: string;
      startTime: string;
      endTime: string;
    }) => {
      const reservationDate = new Date(reservation.startTime);

      // Comprueba si la fecha de la reservación está en la semana actual que se muestra.
      const isInCurrentWeek = currentWeek.some(
        (dayInWeek) =>
          dayInWeek.toDateString() === reservationDate.toDateString()
      );

      if (!isInCurrentWeek) {
        return;
      }

      // Formatear HH:mm
      const formatTime = (date: Date) => {
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
      };

      const dayOfWeek =
        reservationDate.getDay() === 0 ? 6 : reservationDate.getDay() - 1;

      const newEvent: Event = {
        id: reservation.reservationId,
        title: reservation.spaceName,
        startTime: formatTime(new Date(reservation.startTime)),
        endTime: formatTime(new Date(reservation.endTime)),
        day: dayOfWeek,
        color: "stone",
      };

      setAllEvents((prevEvents) => [...prevEvents, newEvent]);
    };

    // Suscríbete al evento
    socket.on("RESERVATION_CREATED", onNewReservation);

    // Limpia la suscripción cuando el componente se desmonte
    return () => {
      socket.off("RESERVATION_CREATED", onNewReservation);
    };
  }, []);

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

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <CustomHeader title={`Calendario - ${formatDate(currentDate)}`} />
      <div className="w-full mt-8 h-[calc(100vh-14rem)] bg-stone-50 min-h-[600px]">
        <Calendar events={allEvents} />
      </div>
    </div>
  );
}
