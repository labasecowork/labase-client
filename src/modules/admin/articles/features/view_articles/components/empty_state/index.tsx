import { StatusMessage } from "@/components/ui";
import { InboxArrowDownIcon } from "@heroicons/react/24/outline";

export const EmptyState = () => {
  return (
    <StatusMessage
      title="No hay artículos disponibles"
      description="No hay artículos disponibles, puedes crear uno pulsando en el botón de crear artículo."
      icon={InboxArrowDownIcon}
      color="stone"
    />
  );
};
