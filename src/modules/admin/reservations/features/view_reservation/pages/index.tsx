import { Button, CustomHeader } from "@/components/ui";
import { useTitle } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import { PrinterIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";

export default function ViewReservationPage() {
  const { changeTitle } = useTitle();
  useEffect(() => {
    changeTitle("Ver reserva - La base");
  }, []);
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <CustomHeader to={ROUTES.Admin.ViewAllReservations} title="Ver reserva" />

      <div className="w-full mt-6">
        {/* Ticket de Resumen */}
        <div className="bg-stone-100 relative w-full max-w-[400px] mx-auto lg:max-w-none">
          {/* Encabezado del ticket */}
          <div className="text-left px-6 sm:px-10 py-4 bg-stone-200">
            <h3 className="text-xl font-bold text-stone-900">RESERVA</h3>
            <p className="text-xs text-stone-500 mt-1">Ticket #RES-2024-001</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8 lg:gap-16 px-6 sm:px-10 pb-10 mt-10">
            <div>
              {/* Información del espacio */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-stone-700 mb-1">
                  ESPACIO:
                </p>
                <p className="text-sm text-stone-900">Sala de reuniones</p>
                <p className="text-xs text-stone-500">S/100.00</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-stone-700 mb-1 border-t border-dashed border-stone-300 pt-4">
                  NOMBRE DEL CLIENTE:
                </p>
                <p className="text-sm text-stone-900">
                  Harvey Vasquez Huaranga Yerik
                </p>
              </div>

              {/* Línea punteada separadora */}
              <div className="border-b border-dashed border-stone-300 my-4"></div>

              {/* Información de fecha y hora */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs font-semibold text-stone-700 mb-1">
                    FECHA:
                  </p>
                  <p className="text-sm text-stone-900">10/07/2025</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-700 mb-1">
                    HORARIO:
                  </p>
                  <p className="text-sm text-stone-900">10:00 - 12:00</p>
                </div>
              </div>

              {/* Línea punteada separadora */}
              <div className="border-b border-dashed border-stone-300 my-4"></div>

              {/* Información de personas */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs font-semibold text-stone-700 mb-1">
                    PERSONAS:
                  </p>
                  <p className="text-sm text-stone-900">1</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-700 mb-1">
                    ESPACIO COMPLETO:
                  </p>
                  <p className="text-sm text-stone-900">Sí</p>
                </div>
              </div>

              <div className="block lg:hidden">
                <p className="text-xs font-semibold text-stone-700 mb-1 border-t border-dashed border-stone-300 pt-4">
                  CÓDIGO DE RESERVA:
                </p>
                <div>
                  <img
                    src="https://cdn.pixabay.com/photo/2013/07/12/14/45/qr-code-148732_1280.png"
                    alt="QR Code"
                    className="size-[200px] sm:size-[250px] mx-auto my-4"
                  />
                </div>
              </div>

              {/* Total estimado */}
              <div className="border-t border-dashed border-stone-300 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-stone-700">
                    TOTAL ESTIMADO:
                  </p>
                  <p className="text-lg font-bold text-stone-900 ">S/15.00</p>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex justify-center lg:justify-start items-center h-full">
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2013/07/12/14/45/qr-code-148732_1280.png"
                  alt="QR Code"
                  className="size-[200px] sm:size-[250px] mx-auto my-4"
                />
              </div>
            </div>
          </div>

          {/* Círculos de perforación adicionales - Lado izquierdo */}
          <div className="absolute -left-3 top-[50%] size-6 lg:size-8 bg-white rounded-full"></div>

          {/* Círculos de perforación adicionales - Lado derecho */}
          <div className="absolute -right-3 top-[50%] size-6 lg:size-8 bg-white rounded-full"></div>
        </div>
      </div>

      <div className="mt-4 w-full lg:flex lg:justify-end">
        <Button className="bg-stone-900 text-white py-4 px-8 flex w-full lg:w-auto">
          <PrinterIcon className="size-4 gap-2 text-white" />
          Imprimir ticket
        </Button>
      </div>
    </div>
  );
}
