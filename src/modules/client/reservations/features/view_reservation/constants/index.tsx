import {
  CheckCircleIcon,
  ClockIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

export const getStatusData = (status: string) => {
  switch (status) {
    case "PENDING":
      return {
        label: "Esta reserva esta pendiente",
        description:
          "Para aseguridad su reserva, por favor complete el pago para confirmar su reserva.",
        icon: InformationCircleIcon,
        color: "sky",
      };
    case "CONFIRMED":
      return {
        label: "Esta reserva esta confirmada",
        description:
          "Su reserva esta confirmada, por favor presente su código QR para ingresar al evento.",
        icon: CheckCircleIcon,
        color: "emerald",
      };
    case "CANCELLED":
      return {
        label: "Esta reserva esta cancelada",
        description:
          "Su reserva esta cancelada o esta expirada, por favor contacte al administrador para más información.",
        icon: XCircleIcon,
        color: "rose",
      };
    case "IN_PROGRESS":
      return {
        label: "Esta reserva esta en progreso",
        description:
          "Su reserva esta en progreso, por favor presente su código QR para ingresar al evento.",
        icon: ClockIcon,
        color: "amber",
      };
    default:
      return {
        label: "Esta reserva esta en estado: " + status,
        description:
          "Por favor contacte al administrador para más información.",
        icon: InformationCircleIcon,
        color: "stone",
      };
  }
};
