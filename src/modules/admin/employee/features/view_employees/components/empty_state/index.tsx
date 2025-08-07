import { StatusMessage } from "@/components/ui";
import { UserIcon } from "@heroicons/react/24/solid";

export const EmptyState = () => {
  return (
    <StatusMessage
      title="No hay empleados registrados"
      description="Comienza agregando tu primer empleado"
      icon={UserIcon}
      color="stone"
    />
  );
};
