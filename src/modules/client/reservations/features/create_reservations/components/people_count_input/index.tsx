import { Input } from "@/components/ui";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { forwardRef } from "react";

interface PeopleCountInputProps {
  value: number;
  onChange: (value: number) => void;
  maxCapacity?: number;
  error?: string;
}

export const PeopleCountInput = forwardRef<
  HTMLDivElement,
  PeopleCountInputProps
>(({ value, onChange, maxCapacity, error }, ref) => {
  const handleIncrement = () => {
    const newValue = value + 1;
    if (!maxCapacity || newValue <= maxCapacity) {
      onChange(newValue);
    }
  };

  const handleDecrement = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(1, parseInt(e.target.value) || 1);
    if (!maxCapacity || newValue <= maxCapacity) {
      onChange(newValue);
    }
  };

  return (
    <div ref={ref} className="flex flex-col">
      <label className="text-sm/6 text-stone-500 mb-2">
        Ingresa cantidad de personas:
      </label>

      <div className="relative w-[280px]">
        <Input
          type="number"
          value={value}
          onChange={handleInputChange}
          className={`pr-8 rounded-none h-9.5 ${error ? "border-red-500" : ""}`}
          min="1"
          max={maxCapacity}
        />
        <div className="absolute right-0 top-0 h-full flex flex-col">
          <button
            type="button"
            onClick={handleIncrement}
            disabled={maxCapacity ? value >= maxCapacity : false}
            className="h-full w-6 flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-xs font-bold text-stone-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronUpIcon className="size-4" />
          </button>
          <button
            type="button"
            onClick={handleDecrement}
            disabled={value <= 1}
            className="h-full w-6 flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-xs font-bold text-stone-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronDownIcon className="size-4" />
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {maxCapacity && (
        <p className="text-xs text-stone-400 mt-1">
          Capacidad máxima: {maxCapacity} personas
        </p>
      )}
    </div>
  );
});

PeopleCountInput.displayName = "PeopleCountInput";
