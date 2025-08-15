import { StatusMessage } from "@/components/ui";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export const ErrorState = () => {
  return (
    <StatusMessage
      title="Error al cargar los artículos"
      description="Error al cargar los artículos, por favor intenta nuevamente."
      icon={ExclamationTriangleIcon}
      color="rose"
    />
  );
};
