import { useEffect, useRef, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

// Interfaz para los eventos
interface Event {
  id: string;
  title: string;
  startTime: string; // Formato "HH:MM"
  endTime: string; // Formato "HH:MM"
  day: number; // 0 = Lunes, 1 = Martes, etc.
  color: string; // Color del evento
}

// JSON de eventos de ejemplo
const eventsData: Event[] = [
  {
    id: "1",
    title: "Reunión de equipo",
    startTime: "10:00",
    endTime: "11:30",
    day: 0, // Lunes
    color: "stone",
  },
  {
    id: "2",
    title: "Presentación proyecto",
    startTime: "14:00",
    endTime: "15:30",
    day: 2, // Miércoles
    color: "stone",
  },
  {
    id: "3",
    title: "Revisión con cliente",
    startTime: "16:00",
    endTime: "17:00",
    day: 4, // Viernes
    color: "stone",
  },
];

export const Calendar = () => {
  const container = useRef<Scrollbars | null>(null);
  const containerNav = useRef<HTMLDivElement | null>(null);
  const containerOffset = useRef<HTMLDivElement | null>(null);

  const [currentWeek, setCurrentWeek] = useState<Date[]>([]);
  const [events] = useState<Event[]>(eventsData);

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

  // Función para formatear la fecha

  // Función para obtener el nombre del día
  const getDayName = (date: Date, short: boolean = false) => {
    const days = short
      ? ["L", "M", "X", "J", "V", "S", "D"]
      : ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

    const dayIndex = date.getDay();
    return days[dayIndex === 0 ? 6 : dayIndex - 1]; // Ajustar para Lunes = 0
  };

  // Función para verificar si una fecha es hoy
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Función para convertir tiempo a posición en grid
  const timeToGridRow = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    // Calculamos la posición basada en intervalos de 1 hora a partir de 9AM
    const hoursFromStart = hours - 9;
    const extraRows = minutes >= 30 ? 1 : 0; // Si tiene 30 min o más, va a la siguiente media fila
    return hoursFromStart * 2 + extraRows + 2; // +2 para el offset inicial
  };

  // Función para calcular la duración en filas
  const getEventDuration = (startTime: string, endTime: string) => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    return Math.ceil((endTotalMinutes - startTotalMinutes) / 30);
  };

  // Función para obtener la columna del evento
  const getEventColumn = (dayIndex: number) => {
    // +2 porque la primera columna es para las horas y empezamos desde la columna 2
    return dayIndex + 2;
  };

  useEffect(() => {
    setCurrentWeek(getCurrentWeek());
  }, []);

  useEffect(() => {
    // Posicionar el scroll en 9AM (inicio del horario laboral)
    if (container.current && containerNav.current && containerOffset.current) {
      const currentMinute = 0; // Empezar en el inicio (9AM)
      const scrollTop =
        ((container.current.getScrollHeight() -
          containerNav.current.offsetHeight -
          containerOffset.current.offsetHeight) *
          currentMinute) /
        600; // 600 minutos (10 horas de 9AM a 7PM)
      container.current.scrollTop(scrollTop);
    }
  }, []);

  // Generar horarios de 9AM a 7PM
  const generateTimeSlots = () => {
    const slots = [];

    // Función helper para formatear la hora
    const formatHour = (hour: number) => {
      if (hour === 12) return "12PM";
      if (hour > 12) return `${hour - 12}PM`;
      return `${hour}AM`;
    };

    for (let hour = 9; hour <= 19; hour++) {
      // Cada hora ocupa 2 filas: una para la etiqueta y una vacía
      slots.push(
        <div key={`${hour}-label`}>
          <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
            {formatHour(hour)}
          </div>
        </div>
      );
      slots.push(<div key={`${hour}-empty`} />);
    }
    return slots;
  };

  if (currentWeek.length === 0) {
    return <div>Cargando calendario...</div>;
  }

  return (
    <div className="flex h-full flex-col">
      <Scrollbars ref={container} autoHide style={{ height: "100%" }}>
        <div className="isolate flex flex-auto flex-col bg-stone-50">
          <div
            style={{ width: "165%" }}
            className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
          >
            <div
              ref={containerNav}
              className="sticky top-0 z-30 flex-none bg-stone-50 shadow-sm ring-1 ring-black/5 sm:pr-8"
            >
              {/* Vista móvil */}
              <div className="grid grid-cols-7 text-sm/6 text-stone-500 sm:hidden">
                {currentWeek.map((date, index) => (
                  <button
                    key={index}
                    type="button"
                    className="flex flex-col items-center pt-2 pb-3"
                  >
                    {getDayName(date, true)}{" "}
                    <span
                      className={`mt-1 flex size-8 items-center justify-center font-semibold ${
                        isToday(date)
                          ? "rounded-full bg-stone-600 text-white"
                          : "text-stone-900"
                      }`}
                    >
                      {date.getDate()}
                    </span>
                  </button>
                ))}
              </div>

              {/* Vista desktop */}
              <div className="-mr-px hidden grid-cols-7 divide-x divide-stone-100 border-r border-stone-100 text-sm/6 text-stone-500 sm:grid">
                <div className="col-end-1 w-14" />
                {currentWeek.map((date, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center py-3"
                  >
                    <span
                      className={isToday(date) ? "flex items-baseline" : ""}
                    >
                      {getDayName(date)}{" "}
                      <span
                        className={`items-center justify-center font-semibold ${
                          isToday(date)
                            ? "ml-1.5 flex size-8 justify-center rounded-full bg-stone-600 text-white"
                            : "text-stone-900"
                        }`}
                      >
                        {date.getDate()}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-auto">
              <div className="sticky left-0 z-10 w-14 flex-none bg-stone-50 ring-1 ring-stone-100" />
              <div className="grid flex-auto grid-cols-1 grid-rows-1">
                {/* Líneas horizontales */}
                <div
                  className="col-start-1 col-end-2 row-start-1 grid divide-y divide-stone-100"
                  style={{
                    gridTemplateRows: "repeat(22, minmax(3.5rem, 1fr))",
                  }} // 22 filas para 11 horas (9AM-7PM)
                >
                  <div ref={containerOffset} className="row-end-1 h-7"></div>
                  {generateTimeSlots()}
                </div>

                {/* Líneas verticales */}
                <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-8 grid-rows-1 divide-x divide-stone-100 sm:grid">
                  <div className="col-start-1 row-span-full" />
                  <div className="col-start-2 row-span-full" />
                  <div className="col-start-3 row-span-full" />
                  <div className="col-start-4 row-span-full" />
                  <div className="col-start-5 row-span-full" />
                  <div className="col-start-6 row-span-full" />
                  <div className="col-start-7 row-span-full" />
                  <div className="col-start-8 row-span-full" />
                </div>

                {/* Eventos */}
                <ol
                  className="col-start-1 col-end-2 row-start-1 grid grid-cols-8 sm:pr-8"
                  style={{
                    gridTemplateRows:
                      "1.75rem repeat(22, minmax(3.5rem, 1fr)) auto",
                  }}
                >
                  {events.map((event) => (
                    <li
                      key={event.id}
                      className="relative mt-px flex"
                      style={{
                        gridRow: `${timeToGridRow(
                          event.startTime
                        )} / span ${getEventDuration(
                          event.startTime,
                          event.endTime
                        )}`,
                        gridColumn: `${getEventColumn(event.day)} / ${
                          getEventColumn(event.day) + 1
                        }`,
                      }}
                    >
                      <a
                        href="#"
                        className={`group absolute inset-1 flex flex-col overflow-y-auto p-2 text-xs/5 bg-stone-200 text-stone-900 hover:bg-stone-300 transition-all border-l-4 border-stone-400`}
                      >
                        <p className="order-1 font-semibold">{event.title}</p>
                        <p className="group-hover:opacity-75">
                          <time dateTime={event.startTime}>
                            {event.startTime}
                          </time>
                        </p>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};
