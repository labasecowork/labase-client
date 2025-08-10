import { StatusMessage } from "@/components/ui";
import { InboxIcon } from "@heroicons/react/24/solid";

export const EmptyState = () => {
  return (
    <StatusMessage
      title="No tienes pagos"
      description="Cuando realices un pago, aparecerán aquí."
      icon={InboxIcon}
      color="stone"
    />
  );
};
