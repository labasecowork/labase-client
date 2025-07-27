import { Check, X } from "lucide-react";
import type { PermissionItemProps } from "../../types";

export const PermissionItem: React.FC<PermissionItemProps> = ({
  label,
  allowed,
}) => (
  <div
    className={`flex items-center gap-3 p-3 rounded-md text-sm border ${
      allowed
        ? "bg-stone-50 border-stone-200 text-stone-800"
        : "bg-stone-50 border-stone-200 text-stone-500"
    }`}
  >
    <div
      className={`flex items-center justify-center size-5 rounded-full ${
        allowed ? "bg-stone-800" : "bg-stone-300"
      }`}
    >
      {allowed ? (
        <Check className="size-3 text-white" />
      ) : (
        <X className="size-3 text-stone-500" />
      )}
    </div>
    <span className={`font-medium ${!allowed && "line-through"}`}>{label}</span>
  </div>
);
