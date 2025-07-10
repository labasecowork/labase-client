import { forwardRef } from "react";
import type { Space } from "../../types";
import { Scrollbars } from "react-custom-scrollbars-2";

interface SpaceSelectorProps {
  spaces: Space[];
  selectedSpace: string | null;
  onSpaceSelect: (spaceId: string) => void;
  error?: string;
}

export const SpaceSelector = forwardRef<HTMLDivElement, SpaceSelectorProps>(
  ({ spaces, selectedSpace, onSpaceSelect, error }, ref) => {
    return (
      <div ref={ref} className="mb-8">
        <label className="text-sm/6 text-stone-500 block mb-4">
          Selecciona el espacio:
        </label>

        <div className="h-[350px]">
          {" "}
          {/* Altura fija para el contenedor */}
          <Scrollbars
            style={{ width: "100%", height: "100%" }}
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            universal={true}
          >
            <div className="p-2">
              <div className="flex gap-4" style={{ width: "max-content" }}>
                {spaces.map((space) => (
                  <div
                    key={space.id}
                    onClick={() => onSpaceSelect(space.id)}
                    className={`flex-shrink-0 w-80 bg-white border-2 rounded-none overflow-hidden cursor-pointer transition-all duration-200 ${
                      selectedSpace === space.id
                        ? "border-stone-900 shadow-lg"
                        : " border-none shadow hover:shadow-md"
                    }`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={space.imageUrl}
                        alt={space.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-stone-900 text-sm leading-tight">
                          {space.name}
                        </h3>
                        <span className="text-xs font-bold text-stone-900 ml-2">
                          {space.price}
                        </span>
                      </div>
                      <p className="text-stone-400 text-xs mb-3 leading-relaxed">
                        {space.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-stone-500">
                          Capacidad: {space.capacity} personas
                        </span>
                        {selectedSpace === space.id && (
                          <span className="text-xs font-medium text-stone-900 bg-stone-100 px-2 py-1 rounded">
                            Seleccionado
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Scrollbars>
        </div>

        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </div>
    );
  }
);

SpaceSelector.displayName = "SpaceSelector";
