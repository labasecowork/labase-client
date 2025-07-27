import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => (
  <div className="bg-red-500/10 p-10 sm:p-24 gap-2 mt-8">
    <div className="mx-auto max-w-md text-center">
      <ExclamationTriangleIcon className="size-10 text-rose-800 mx-auto" />
      <div>
        <h2 className="text-xl font-serif font-bold text-rose-800 mt-4">
          Ups! Sucedio un error
        </h2>
        <p className="text-xs sm:text-sm text-rose-700 mt-0 sm:mt-2">
          No se pudo encontrar la reserva solicitada, posiblemente no existe o
          ya fue cancelada, si crees que esto es un error, por favor contacta a
          soporte.
        </p>
      </div>
    </div>
  </div>
);
