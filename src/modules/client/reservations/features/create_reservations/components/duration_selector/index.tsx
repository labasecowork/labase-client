import { Button } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown_menu";
import { ClockIcon } from "@heroicons/react/20/solid";
import { forwardRef } from "react";

const generateTimeSlots = () => {
  const times = [];
  for (let hour = 9; hour <= 20; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      let displayHour = hour;
      let period = "am";

      if (hour === 0) {
        displayHour = 12; // Medianoche
      } else if (hour === 12) {
        displayHour = 12; // Mediodía
        period = "pm";
      } else if (hour > 12) {
        displayHour = hour - 12;
        period = "pm";
      }

      const timeString = `${displayHour}:${minute
        .toString()
        .padStart(2, "0")}${period}`;
      times.push(timeString);
    }
  }
  return times;
};

const timeToMinutes = (time: string): number => {
  const match = time.match(/^(\d{1,2}):(\d{2})(am|pm)$/);
  if (!match) return 0;

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

const getAvailableEndTimes = (startTime: string | null) => {
  const allTimes = generateTimeSlots();

  if (!startTime) {
    return allTimes.filter((time) => timeToMinutes(time) >= 570);
  }

  const startMinutes = timeToMinutes(startTime);
  const minEndMinutes = startMinutes + 30;

  if (minEndMinutes > 1245) {
    return [];
  }

  return allTimes.filter((time) => timeToMinutes(time) >= minEndMinutes);
};

interface TimeRangeSelectorProps {
  startTime: string | null;
  endTime: string | null;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  startTimeError?: string;
  endTimeError?: string;
}

export const TimeRangeSelector = forwardRef<
  HTMLDivElement,
  TimeRangeSelectorProps
>(
  (
    {
      startTime,
      endTime,
      onStartTimeChange,
      onEndTimeChange,
      startTimeError,
      endTimeError,
    },
    ref
  ) => {
    const startTimeSlots = generateTimeSlots();
    const endTimeSlots = getAvailableEndTimes(startTime);

    const handleStartTimeChange = (time: string) => {
      onStartTimeChange(time);
      if (endTime) {
        const availableEndTimes = getAvailableEndTimes(time);
        if (!availableEndTimes.includes(endTime)) {
          onEndTimeChange("");
        }
      }
    };

    return (
      <div
        ref={ref}
        className="items-start gap-4 mb-6 grid grid-cols-1 lg:grid-cols-2"
      >
        <div className="flex flex-col w-full">
          <label className="text-sm/6 text-stone-500 mb-2">
            Ingresa hora de inicio:
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal text-sm px-4 py-2 rounded-sm text-stone-500 ${
                  startTimeError ? "border-rose-800" : ""
                }`}
              >
                <ClockIcon className="size-4" />
                {startTime ? startTime : "Selecciona hora"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto p-0 rounded-sm max-h-60 overflow-y-auto">
              {startTimeSlots.map((time) => (
                <DropdownMenuItem
                  key={time}
                  className="px-3 py-1 rounded-sm cursor-pointer"
                  onClick={() => handleStartTimeChange(time)}
                >
                  <span>{time}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {startTimeError && (
            <p className="text-rose-800 text-xs mt-1">{startTimeError}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm/6 text-stone-500 mb-2">
            Ingresa hora de finalización:
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal text-sm px-4 py-2 rounded-sm text-stone-500 ${
                  endTimeError ? "border-rose-800" : ""
                }`}
                disabled={endTimeSlots.length === 0}
              >
                <ClockIcon className="size-4" />
                {endTime
                  ? endTime
                  : endTimeSlots.length === 0
                  ? "Selecciona hora de inicio primero"
                  : "Selecciona hora"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto p-0 rounded-sm max-h-60 overflow-y-auto">
              {endTimeSlots.map((time) => (
                <DropdownMenuItem
                  key={time}
                  className="px-3 py-1 rounded-sm cursor-pointer"
                  onClick={() => onEndTimeChange(time)}
                >
                  <span>{time}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {endTimeError && (
            <p className="text-rose-800 text-xs mt-1">{endTimeError}</p>
          )}
        </div>
      </div>
    );
  }
);

TimeRangeSelector.displayName = "TimeRangeSelector";
