import { format } from "date-fns";
import { es } from "date-fns/locale";
import { forwardRef, useMemo } from "react";
import type { Space } from "@/modules/client/space/features/get_spaces/types";
import { timeToMinutes } from "@/utilities/date_utilities";

interface ReservationSummaryProps {
  selectedSpace: Space | null;
  date: Date | undefined;
  startTime: string | null;
  endTime: string | null;
  personCount: number;
  isFullSpace: boolean;
}

export const ReservationSummary = forwardRef<
  HTMLDivElement,
  ReservationSummaryProps
>(
  (
    { selectedSpace, date, startTime, endTime, personCount, isFullSpace },
    ref
  ) => {
    const priceCalculation = useMemo(() => {
      if (!selectedSpace || !startTime || !endTime) {
        return { total: 0, unitPrice: 0, description: "", duration: 0 };
      }

      const startMinutes = timeToMinutes(startTime);
      const endMinutes = timeToMinutes(endTime);
      const durationMinutes = endMinutes - startMinutes;
      const durationHours = durationMinutes / 60;

      if (durationHours <= 0) {
        return {
          total: 0,
          unitPrice: 0,
          description: "Duración inválida",
          duration: 0,
        };
      }

      const mode = isFullSpace ? "GROUP" : "INDIVIDUAL";

      const priceRule = selectedSpace.prices.find(
        (p) => p.duration === "HOUR" && p.mode === mode
      );

      if (!priceRule) {
        return {
          total: 0,
          unitPrice: 0,
          description: "Precio no disponible",
          duration: durationHours,
        };
      }

      if (isFullSpace) {
        const total = priceRule.amount * durationHours;
        return {
          total,
          unitPrice: priceRule.amount,
          description: `S/${priceRule.amount}/hora × ${durationHours}h`,
          duration: durationHours,
        };
      } else {
        const total = priceRule.amount * personCount * durationHours;
        return {
          total,
          unitPrice: priceRule.amount,
          description: `S/${priceRule.amount}/hora × ${personCount} personas × ${durationHours}h`,
          duration: durationHours,
        };
      }
    }, [selectedSpace, personCount, isFullSpace, startTime, endTime]);

    return (
      <div ref={ref} className="w-full p-4">
        {/* Ticket de Resumen */}
        <div className="bg-stone-100 p-6 relative">
          <div className="text-center border-b border-dashed border-stone-300 pb-4 mb-4">
            <h3 className="text-lg font-bold text-stone-900">
              RESUMEN DE RESERVA
            </h3>
            <p className="text-xs text-stone-500 mt-1">Reserva temporal</p>
          </div>

          {/* Información del espacio */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-stone-700 mb-1">
              ESPACIO:
            </p>
            <p className="text-sm text-stone-900">
              {selectedSpace ? selectedSpace.name : "No seleccionado"}
            </p>
            {selectedSpace && (
              <p className="text-xs text-stone-500">
                {isFullSpace
                  ? "Modalidad: Espacio completo"
                  : "Modalidad: Individual"}
              </p>
            )}
          </div>

          <div className="border-b border-dashed border-stone-300 my-4"></div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs font-semibold text-stone-700 mb-1">
                FECHA:
              </p>
              <p className="text-sm text-stone-900">
                {date
                  ? format(date, "dd/MM/yyyy", { locale: es })
                  : "No seleccionada"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-700 mb-1">
                HORARIO:
              </p>
              <p className="text-sm text-stone-900">
                {startTime && endTime
                  ? `${startTime} - ${endTime}`
                  : "No seleccionado"}
              </p>
            </div>
          </div>

          <div className="border-b border-dashed border-stone-300 my-4"></div>

          {/* Información de personas */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs font-semibold text-stone-700 mb-1">
                PERSONAS:
              </p>
              <p className="text-sm text-stone-900">{personCount}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-700 mb-1">
                ESPACIO COMPLETO:
              </p>
              <p className="text-sm text-stone-900">
                {isFullSpace ? "Sí" : "No"}
              </p>
            </div>
          </div>

          {/* Total estimado */}
          <div className="border-t border-dashed border-stone-300 pt-4 mt-4">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-stone-700">
                TOTAL ESTIMADO:
              </p>
              <p className="text-lg font-bold text-stone-900">
                S/{priceCalculation.total.toFixed(2)}
              </p>
            </div>
            {selectedSpace && priceCalculation.description && (
              <div className="mt-2 space-y-1">
                <p className="text-xs text-stone-500">
                  {priceCalculation.description}
                </p>
                {priceCalculation.duration > 0 && (
                  <p className="text-xs text-stone-400">
                    Duración: {priceCalculation.duration} hora
                    {priceCalculation.duration !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Círculos de perforación del ticket */}
          <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full"></div>
          <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full"></div>
        </div>
      </div>
    );
  }
);

ReservationSummary.displayName = "ReservationSummary";
