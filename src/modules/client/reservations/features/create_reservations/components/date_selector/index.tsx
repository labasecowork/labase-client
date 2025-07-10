import { Button } from "@/components/ui";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { forwardRef } from "react";

interface DateSelectorProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  error?: string;
}

export const DateSelector = forwardRef<HTMLDivElement, DateSelectorProps>(
  ({ date, onDateChange, error }, ref) => {
    return (
      <div ref={ref} className="flex flex-col">
        <label className="text-sm/6 text-stone-500 mb-2">
          Ingresa día de reserva:
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              data-empty={!date}
              className={`data-[empty=true]:text-muted-foreground rounded-none w-[280px] justify-start text-left font-normal text-sm px-4 py-2 shadow-none ${
                error ? "border-red-500" : ""
              }`}
            >
              <CalendarIcon className="size-4" />
              {date ? (
                format(date, "PPP", { locale: es })
              ) : (
                <span>Selecciona fecha</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 rounded-none">
            <Calendar mode="single" selected={date} onSelect={onDateChange} />
          </PopoverContent>
        </Popover>

        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

DateSelector.displayName = "DateSelector";
