import { formatDate } from "@/utilities";
import { CalendarDay, CalendarWeek } from "../components";
import { useEffect, useState } from "react";
import { useTitle, useWindowSize } from "@/hooks";
import { CustomHeader } from "@/components/ui";
import { useGetCalendar } from "../service";
import { socket } from "@/lib/socket";
import type { Event } from "@/types";
import { ROUTES } from "@/routes/routes";

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
  const { width } = useWindowSize();

  const isMobile = width < 700;

  const getCurrentWeek = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);

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

  useEffect(() => {
    if (calendarData) {
      const mappedEvents = mapEventsForCalendar(calendarData);
      setAllEvents(mappedEvents);
    }
  }, [calendarData]);

  useEffect(() => {
    const currentWeek = getCurrentWeek();

    const onNewReservation = (reservation: {
      reservationId: string;
      spaceName: string;
      startTime: string;
      endTime: string;
    }) => {
      const reservationDate = new Date(reservation.startTime);

      const isInCurrentWeek = currentWeek.some(
        (dayInWeek) =>
          dayInWeek.toDateString() === reservationDate.toDateString()
      );

      if (!isInCurrentWeek) {
        return;
      }

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

    socket.on("RESERVATION_CREATED", onNewReservation);

    return () => {
      socket.off("RESERVATION_CREATED", onNewReservation);
    };
  }, []);

  useEffect(() => {
    changeTitle("Calendario - La base");
  }, [changeTitle]);

  if (isLoading || isError || !calendarData) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-8">
        <CustomHeader
          title={`Calendario - ${formatDate(currentDate)}`}
          to={ROUTES.Admin.ViewAllReservations}
        />
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
      <CustomHeader
        title={`Calendario - ${formatDate(currentDate)}`}
        to={ROUTES.Admin.ViewAllReservations}
      />
      <div className="w-full mt-8 h-[calc(100vh-14rem)] bg-stone-50 min-h-[600px]">
        {isMobile ? (
          <CalendarDay events={allEvents} />
        ) : (
          <CalendarWeek events={allEvents} />
        )}
      </div>
    </div>
  );
}
