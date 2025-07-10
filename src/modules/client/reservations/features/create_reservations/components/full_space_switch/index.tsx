import { Switch } from "@/components/ui/switch";
import { forwardRef } from "react";

interface FullSpaceSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
}

export const FullSpaceSwitch = forwardRef<HTMLDivElement, FullSpaceSwitchProps>(
  ({ checked, onCheckedChange, error }, ref) => {
    return (
      <div
        ref={ref}
        className="flex items-center gap-2 w-full mb-6 justify-between pr-4"
      >
        <div className="flex flex-col">
          <label className="text-sm/6 text-stone-500" htmlFor="full-space">
            ¿Ocupará todo el espacio?
          </label>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
        <Switch
          id="full-space"
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
      </div>
    );
  }
);

FullSpaceSwitch.displayName = "FullSpaceSwitch";
