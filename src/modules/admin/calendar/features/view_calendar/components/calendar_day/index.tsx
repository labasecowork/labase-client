import { useState, useEffect } from "react";
import type { Event } from "@/types";

interface CalendarDayProps {
  events: Event[];
}

export const CalendarDay = ({ events }: CalendarDayProps) => {
  const [currentWeek, setCurrentWeek] = useState<Date[]>([]);

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

  const getDayName = (date: Date, short: boolean = false) => {
    const days = short
      ? ["L", "M", "X", "J", "V", "S", "D"]
      : ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

    const dayIndex = date.getDay();
    return days[dayIndex === 0 ? 6 : dayIndex - 1];
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getTodayDayIndex = () => {
    const today = new Date();
    const dayIndex = today.getDay();
    return dayIndex === 0 ? 6 : dayIndex - 1;
  };

  const timeToGridRow = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;
    return Math.floor(totalMinutes / 5) + 2;
  };

  const getEventDuration = (startTime: string, endTime: string) => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    return Math.ceil((endTotalMinutes - startTotalMinutes) / 5);
  };

  const todayEvents = events.filter(
    (event) => event.day === getTodayDayIndex()
  );

  useEffect(() => {
    const week = getCurrentWeek();
    setCurrentWeek(week);
  }, []);

  return (
    <div className="flex h-full flex-col bg-stone-50">
      <div className="isolate flex flex-auto overflow-hidden">
        <div className="flex flex-auto flex-col overflow-auto">
          <div className="sticky top-0 z-10 grid flex-none grid-cols-7 bg-stone-50 text-xs text-stone-500 shadow-sm ring-1 ring-black/5">
            {currentWeek.length > 0
              ? currentWeek.map((date, index) => (
                  <button
                    key={index}
                    type="button"
                    className="flex flex-col items-center pt-3 pb-1.5"
                  >
                    <span>{getDayName(date, true)}</span>
                    <span
                      className={`mt-3 flex size-8 items-center justify-center text-base font-semibold ${
                        isToday(date)
                          ? "rounded-full bg-stone-800 text-white"
                          : "text-stone-900"
                      }`}
                    >
                      {date.getDate()}
                    </span>
                  </button>
                ))
              : Array.from({ length: 7 }, (_, index) => (
                  <button
                    key={index}
                    type="button"
                    className="flex flex-col items-center pt-3 pb-1.5"
                  >
                    <span>-</span>
                    <span className="mt-3 flex size-8 items-center justify-center text-base font-semibold text-stone-900">
                      -
                    </span>
                  </button>
                ))}
          </div>
          <div className="flex w-full flex-auto">
            <div className="w-14 flex-none bg-stone-50 ring-1 ring-stone-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              <div
                style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-stone-100"
              >
                <div className="row-end-1 h-7" />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    12AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    1AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    2AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    3AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    4AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    5AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    6AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    7AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    8AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    9AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    10AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    11AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    12PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    1PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    2PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    3PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    4PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    5PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    6PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    7PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    8PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    9PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    10PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    11PM
                  </div>
                </div>
                <div />
              </div>

              <ol
                style={{
                  gridTemplateRows: "1.75rem repeat(288, minmax(0, 1fr)) auto",
                }}
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
              >
                {todayEvents.map((event) => {
                  return (
                    <li
                      key={event.id}
                      style={{
                        gridRow: `${timeToGridRow(
                          event.startTime
                        )} / span ${getEventDuration(
                          event.startTime,
                          event.endTime
                        )}`,
                      }}
                      className="relative mt-px flex"
                    >
                      <a
                        href="#"
                        className={`group absolute inset-1 flex flex-col overflow-y-auto bg-stone-200 p-2 text-xs/5 `}
                      >
                        <p className={`order-1 font-semibold text-stone-700`}>
                          {event.title}
                        </p>
                        <p className={`order-1 text-stone-500`}>
                          {event.startTime} - {event.endTime}
                        </p>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
