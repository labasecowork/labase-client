import { ChevronDown, Users } from "lucide-react";
import type { SubscriberResponse } from "../../types";
import { SubscribersTable } from "..";

interface Props {
  isExpanded: boolean;
  onToggle: () => void;
  data: SubscriberResponse;
}

export const MobileSubscribersList: React.FC<Props> = ({
  isExpanded,
  onToggle,
  data,
}) => {
  return (
    <div className="lg:hidden mb-6">
      <div className="border border-stone-200 bg-white">
        <div
          onClick={onToggle}
          className="p-4 cursor-pointer hover:bg-stone-50 transition-colors duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="size-5 text-stone-600" />
              <div>
                <h3 className="font-semibold text-stone-900">
                  Lista de Suscriptores
                </h3>
                <p className="text-sm text-stone-600">
                  {data.count || 0} usuarios suscritos
                </p>
              </div>
            </div>
            <ChevronDown
              className={`size-5 text-stone-400 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
        {isExpanded && (
          <div className="border-t border-stone-200 p-4">
            <div className="bg-stone-50 overflow-hidden border border-stone-200">
              <div className="max-h-[400px] overflow-y-auto">
                <SubscribersTable subscribers={data.subscribers || []} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
