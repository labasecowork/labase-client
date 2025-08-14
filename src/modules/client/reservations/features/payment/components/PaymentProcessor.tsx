import React, { useState } from "react";
import { useProcessPayment } from "../hooks/useProcessPayment";
import { toast } from "sonner";

interface PaymentProcessorProps {
  purchaseNumber: string;
  onSuccess?: () => void;
  onError?: () => void;
  showConfetti?: boolean;
}

export const PaymentProcessor: React.FC<PaymentProcessorProps> = ({
  purchaseNumber,
  onSuccess,
  onError,
  showConfetti = true,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // Usar el hook useProcessPayment con callbacks personalizados
  const { loading, result, process, reset, isSuccess, isError } = useProcessPayment({
    onSuccess: (paymentResult) => {
      console.log("Pago procesado exitosamente:", paymentResult);
      setIsProcessing(false);
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      console.error("Error procesando pago:", error);
      setIsProcessing(false);
      if (onError) {
        onError();
      }
    },
    showConfetti,
  });

  const handleProcessPayment = async () => {
    if (!purchaseNumber.trim()) {
      toast.error("Número de compra requerido");
      return;
    }

    setIsProcessing(true);
    await process(purchaseNumber);
  };

  const handleRetry = () => {
    reset();
    handleProcessPayment();
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold font-serif text-stone-900 mb-4">
        Verificar Pago
      </h2>

      {/* Información del número de compra */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Número de Compra:
        </label>
        <div className="bg-stone-50 border border-stone-200 rounded-lg p-3">
          <code className="text-sm text-stone-600">{purchaseNumber}</code>
        </div>
      </div>

      {/* Estado del procesamiento */}
      {(loading || isProcessing) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent" />
            <span className="text-sm font-medium text-blue-800">
              Verificando resultado del pago...
            </span>
          </div>
        </div>
      )}

      {/* Resultado del pago */}
      {result && (
        <div className={`rounded-lg p-4 mb-4 ${
          isSuccess
            ? "bg-green-50 border border-green-200"
            : "bg-red-50 border border-red-200"
        }`}>
          <div className="flex items-start gap-3">
            <div className={`w-2 h-2 rounded-full mt-1 ${
              isSuccess ? "bg-green-500" : "bg-red-500"
            }`} />
            <div className="flex-1">
              <h3 className={`text-sm font-medium mb-1 ${
                isSuccess ? "text-green-800" : "text-red-800"
              }`}>
                {isSuccess ? "¡Pago Exitoso!" : "Error en el Pago"}
              </h3>
              <p className={`text-xs ${
                isSuccess ? "text-green-700" : "text-red-700"
              }`}>
                {result.message}
              </p>

              {/* Detalles adicionales para pagos exitosos */}
              {isSuccess && result.card && (
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-green-600">
                    <strong>Tarjeta:</strong> **** {result.card}
                  </p>
                  {result.brand && (
                    <p className="text-xs text-green-600">
                      <strong>Marca:</strong> {result.brand}
                    </p>
                  )}
                  <p className="text-xs text-green-600">
                    <strong>Fecha:</strong> {new Date(result.transactionDate).toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600">
                    <strong>Monto:</strong> {result.currency} {result.amount.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Botones de acción */}
      <div className="space-y-2">
        {!result && (
          <button
            onClick={handleProcessPayment}
            disabled={loading || isProcessing || !purchaseNumber.trim()}
            className="w-full bg-stone-900 text-white py-3 px-4 rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading || isProcessing ? "Verificando..." : "Verificar Pago"}
          </button>
        )}

        {result && isError && (
          <button
            onClick={handleRetry}
            disabled={loading || isProcessing}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Intentar de Nuevo
          </button>
        )}

        {result && isSuccess && (
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Continuar
          </button>
        )}

        {result && (
          <button
            onClick={reset}
            className="w-full bg-stone-200 text-stone-700 py-2 px-4 rounded-lg hover:bg-stone-300 transition-colors font-medium"
          >
            Limpiar Resultado
          </button>
        )}
      </div>

      {/* Información adicional */}
      <div className="mt-4 text-xs text-stone-500 text-center">
        <p>Los pagos son procesados de forma segura</p>
      </div>
    </div>
  );
};

export default PaymentProcessor;
