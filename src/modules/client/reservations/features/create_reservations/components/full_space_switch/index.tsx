import { Switch } from "@/components/ui/switch";
import { forwardRef, useMemo } from "react";
import type { Space } from "@/modules/client/space/features/get_spaces/types";

interface FullSpaceSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  selectedSpace: Space | null;
  peopleCount: number;
  error?: string;
}

export const FullSpaceSwitch = forwardRef<HTMLDivElement, FullSpaceSwitchProps>(
  ({ checked, onCheckedChange, selectedSpace, peopleCount, error }, ref) => {
    const priceInfo = useMemo(() => {
      if (!selectedSpace) return { individual: null, group: null };

      const duration = "HOUR";
      const individualPrice = selectedSpace.prices.find(
        (p) => p.duration === duration && p.mode === "INDIVIDUAL"
      );
      const groupPrice = selectedSpace.prices.find(
        (p) => p.duration === duration && p.mode === "GROUP"
      );

      return {
        individual: individualPrice
          ? {
              available: selectedSpace.allowByUnit,
              total: individualPrice.amount * peopleCount,
              unit: individualPrice.amount,
            }
          : null,
        group: groupPrice
          ? {
              available: selectedSpace.allowFullRoom,
              total: groupPrice.amount,
              unit: groupPrice.amount,
            }
          : null,
      };
    }, [selectedSpace, peopleCount]);

    return (
      <div ref={ref} className="w-full mb-6">
        <div className="flex items-center gap-2 justify-between pr-4 mb-3">
          <div className="flex flex-col">
            <label className="text-sm/6 text-stone-500" htmlFor="full-space">
              Modalidad de reserva
            </label>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          <Switch
            id="full-space"
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={!selectedSpace}
          />
        </div>

        {selectedSpace && (
          <div className="space-y-2 text-xs">
            {/* Modalidad Individual */}
            <div
              className={`flex items-center justify-between p-2 rounded ${
                !checked ? "bg-stone-50 border border-stone-200" : "bg-stone-50"
              } ${!priceInfo.individual?.available ? "opacity-50" : ""}`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    !checked ? "bg-stone-400" : "bg-stone-400"
                  }`}
                ></span>
                <span className="font-medium">Individual</span>
                {!priceInfo.individual?.available && (
                  <span className="text-red-500 text-xs">(No disponible)</span>
                )}
              </div>
              {priceInfo.individual?.available && (
                <span className="font-semibold">
                  S/{priceInfo.individual.total.toFixed(2)}
                  <span className="text-stone-400 ml-1">
                    (S/{priceInfo.individual.unit} × {peopleCount})
                  </span>
                </span>
              )}
            </div>

            {/* Modalidad Grupal */}
            <div
              className={`flex items-center justify-between p-2 ${
                checked ? "bg-stone-50 border border-stone-200" : "bg-stone-50"
              } ${!priceInfo.group?.available ? "opacity-50" : ""}`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    checked ? "bg-stone-400" : "bg-stone-400"
                  }`}
                ></span>
                <span className="font-medium">Espacio completo</span>
                {!priceInfo.group?.available && (
                  <span className="text-red-500 text-xs">(No disponible)</span>
                )}
              </div>
              {priceInfo.group?.available && (
                <span className="font-semibold">
                  S/{priceInfo.group.total.toFixed(2)}
                  <span className="text-stone-400 ml-1">(precio fijo)</span>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

FullSpaceSwitch.displayName = "FullSpaceSwitch";
