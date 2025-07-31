import { useProcessPayment } from "../hooks/useProcessPayment";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

export default function PaymentResultPage() {
  const { data: result, isLoading, isError, error } = useProcessPayment();

  if (isLoading) {
    return <div>Procesando resultado del pago...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="p-6 mx-auto w-full max-w-[400px] rounded-3xl shadow-sm bg-neutral-50 text-center">
        {result?.success ? (
          <div>
            <h1 className="text-2xl font-bold text-green-600">
              ¡Pago Exitoso!
            </h1>
            <p className="mt-2">Tu reserva ha sido confirmada.</p>
            <p>Orden: {result?.purchaseNumber}</p>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-red-600">Pago Fallido</h1>
            <p className="mt-2">
              {result?.message || "La transacción no pudo ser completada."}
            </p>
          </div>
        )}
        <Link to={ROUTES.Client.ViewReservations}>Volver a mis reservas</Link>
      </div>
    </div>
  );
}
