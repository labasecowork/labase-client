import { StatusMessage } from "@/components/ui";
import { TriangleAlertIcon } from "lucide-react";

export const ErrorState = () => {
  return (
    <StatusMessage
      title="Error al cargar empleados"
      description="Hubo un problema al obtener la lista de empleados. Por favor, intenta de nuevo."
      icon={TriangleAlertIcon}
      color="rose"
    />
  );
};
