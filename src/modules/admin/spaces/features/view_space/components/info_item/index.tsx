import { Check, X } from "lucide-react";
import type { InfoItemProps } from "../../types";

export const InfoItem: React.FC<InfoItemProps> = ({
  icon: Icon,
  label,
  value,
  isStatus,
  statusValue,
}) => (
  <div>
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Icon className="size-4" />
      <span>{label}</span>
    </div>
    {isStatus ? (
      <div
        className={`mt-1 text-sm font-semibold flex items-center gap-2 ${
          statusValue ? "text-emerald-700" : "text-rose-700"
        }`}
      >
        {statusValue ? <Check className="size-4" /> : <X className="size-4" />}
        {value}
      </div>
    ) : (
      <p className="mt-1 font-semibold text-stone-800 text-sm">{value}</p>
    )}
  </div>
);
