import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useProcessPayment } from "../hooks/useProcessPayment";
import { useInitializePayment } from "../hooks/useInitializePayment";
import { useNiubizCheckout } from "../hooks/useNiubizCheckout";
import { toast } from "sonner";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  reservationCode?: string;
  onPaymentSuccess?: () => void;
  onPaymentError?: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  reservationCode,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const [currentPurchaseNumber, setCurrentPurchaseNumber] =
    useState<string>("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Hook para procesar el resultado del pago con confetti automático
  const {
    loading: processingResult,
    process,
    result,
    reset,
  } = useProcessPayment({
    onSuccess: (paymentResult) => {
      console.log("Pago exitoso:", paymentResult);
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
    },
    onError: (error) => {
      console.error("Error en pago:", error);
      if (onPaymentError) {
        onPaymentError();
      }
    },
    closeModal: onClose,
    showConfetti: true,
  });

  // Hook para inicializar el pago
  const { mutate: initializePayment, isPending: initializingPayment } =
    useInitializePayment();

  // Hook para abrir el checkout de Niubiz
  const { openCheckout } = useNiubizCheckout();

  const handlePaymentProcess = () => {
    setIsProcessingPayment(true);

    initializePayment(
      { amount },
      {
        onSuccess: ({ sessionKey, purchaseNumber }) => {
          setCurrentPurchaseNumber(purchaseNumber);
          toast.info("Iniciando pasarela de pago...");

          // Abrir checkout de Niubiz
          openCheckout({
            sessionKey,
            purchaseNumber,
            amount,
          });

          // Simular un delay y luego procesar el resultado
          // En un caso real, esto se haría cuando el usuario regrese del checkout
          setTimeout(() => {
            process(purchaseNumber);
            setIsProcessingPayment(false);
          }, 3000); // Ajusta este tiempo según tu flujo
        },
        onError: (err) => {
          toast.error("Error al inicializar el pago", {
            description: err.message,
          });
          setIsProcessingPayment(false);
        },
      },
    );
  };

  const handleClose = () => {
    if (processingResult || initializingPayment || isProcessingPayment) {
      toast.warning("No puedes cerrar el modal mientras se procesa el pago");
      return;
    }
    reset();
    onClose();
  };

  // Cerrar modal con ESC
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, processingResult, initializingPayment, isProcessingPayment]);

  if (!isOpen) return null;

  const isLoading =
    initializingPayment || isProcessingPayment || processingResult;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200">
          <h2 className="text-xl font-bold font-serif text-stone-900">
            Procesar Pago
          </h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="p-1 hover:bg-stone-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="size-5 text-stone-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Información del pago */}
          <div className="bg-stone-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-stone-700">
                Monto a pagar:
              </span>
              <span className="text-lg font-bold text-stone-900">
                S/{amount.toFixed(2)}
              </span>
            </div>
            {reservationCode && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-stone-700">
                  Reserva:
                </span>
                <span className="text-sm text-stone-600">
                  #{reservationCode}
                </span>
              </div>
            )}
          </div>

          {/* Estado del pago */}
          {result && (
            <div
              className={`rounded-lg p-4 mb-4 ${
                result.success
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    result.success ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    result.success ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {result.success ? "¡Pago exitoso!" : "Error en el pago"}
                </span>
              </div>
              <p
                className={`text-xs mt-1 ${
                  result.success ? "text-green-700" : "text-red-700"
                }`}
              >
                {result.message}
              </p>
            </div>
          )}

          {/* Estado de carga */}
          {isLoading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent" />
                <span className="text-sm font-medium text-blue-800">
                  {initializingPayment && "Inicializando pago..."}
                  {isProcessingPayment && "Procesando en pasarela..."}
                  {processingResult && "Verificando resultado..."}
                </span>
              </div>
            </div>
          )}

          {/* Botón de acción */}
          {!result && (
            <button
              onClick={handlePaymentProcess}
              disabled={isLoading}
              className="w-full bg-stone-900 text-white py-3 px-4 rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? "Procesando..." : "Iniciar Pago"}
            </button>
          )}

          {/* Botones de resultado */}
          {result && (
            <div className="flex gap-3">
              {result.success ? (
                <button
                  onClick={handleClose}
                  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Continuar
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      reset();
                    }}
                    className="flex-1 bg-stone-600 text-white py-3 px-4 rounded-lg hover:bg-stone-700 transition-colors font-medium"
                  >
                    Intentar de nuevo
                  </button>
                  <button
                    onClick={handleClose}
                    className="flex-1 bg-stone-200 text-stone-700 py-3 px-4 rounded-lg hover:bg-stone-300 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                </>
              )}
            </div>
          )}

          {/* Información adicional */}
          <div className="mt-4 text-xs text-stone-500 text-center">
            <p>Procesamiento seguro con tecnología Niubiz</p>
          </div>
        </div>
      </div>
    </div>
  );
};
