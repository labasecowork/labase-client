import { forwardRef } from "react";
import type { Space } from "@/modules/client/space/features/get_spaces/types";
import { Scrollbars } from "react-custom-scrollbars-2";

interface SpaceSelectorProps {
  spaces: Space[];
  selectedSpace: string | null;
  onSpaceSelect: (spaceId: string) => void;
  error?: string;
  isLoading: boolean;
}

const SpaceCardSkeleton = () => (
  <div className="flex-shrink-0 w-80 h-[320px] bg-stone-50 border-2 rounded-none overflow-hidden animate-pulse">
    <div className="h-48 bg-stone-200"></div>
    <div className="p-4">
      <div className="h-4 bg-stone-200 rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-stone-200 rounded w-full mb-1"></div>
      <div className="h-3 bg-stone-200 rounded w-5/6 mb-4"></div>
      <div className="h-3 bg-stone-200 rounded w-1/2"></div>
    </div>
  </div>
);

export const SpaceSelector = forwardRef<HTMLDivElement, SpaceSelectorProps>(
  ({ spaces, selectedSpace, onSpaceSelect, error, isLoading }, ref) => {
    return (
      <div ref={ref} className="mb-8">
        <label className="text-sm/6 text-stone-500 block mb-4">
          Selecciona el espacio:
        </label>

        <div className="h-[380px]">
          <Scrollbars
            style={{ width: "100%", height: "100%" }}
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            universal={true}
          >
            <div className="p-2">
              <div className="flex gap-4" style={{ width: "max-content" }}>
                {isLoading ? (
                  <>
                    <SpaceCardSkeleton />
                    <SpaceCardSkeleton />
                    <SpaceCardSkeleton />
                  </>
                ) : (
                  spaces.map((space) => (
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
                        {/* ENdpoint sin imagen - estatica por ahora*/}
                        <img
                          src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
                          alt={space.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-stone-900 text-sm leading-tight">
                            {space.name}
                          </h3>
                          {/* Mostrar precio base */}
                          <span className="text-xs font-bold text-stone-900 ml-2">
                            {space.prices.find(
                              (p) =>
                                p.duration === "HOUR" && p.mode === "INDIVIDUAL"
                            )?.amount
                              ? `S/${
                                  space.prices.find(
                                    (p) =>
                                      p.duration === "HOUR" &&
                                      p.mode === "INDIVIDUAL"
                                  )?.amount
                                }`
                              : space.prices.find(
                                  (p) =>
                                    p.duration === "HOUR" && p.mode === "GROUP"
                                )?.amount
                              ? `S/${
                                  space.prices.find(
                                    (p) =>
                                      p.duration === "HOUR" &&
                                      p.mode === "GROUP"
                                  )?.amount
                                }`
                              : "N/A"}{" "}
                            x hora
                          </span>
                        </div>
                        <p className="text-stone-400 text-xs mb-3 leading-relaxed">
                          {space.description}
                        </p>

                        {/* Información de capacidad */}
                        <div className="mb-2">
                          <span className="text-xs text-stone-500">
                            Capacidad:{" "}
                            {space.capacityMin === space.capacityMax
                              ? `${space.capacityMax} personas`
                              : `${space.capacityMin}-${space.capacityMax} personas`}
                          </span>
                        </div>

                        {/* Modalidades disponibles */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1 flex-wrap">
                            {space.allowByUnit && (
                              <span className="text-xs bg-stone-100 text-stone-800 px-2 py-1 rounded">
                                Individual
                              </span>
                            )}
                            {space.allowFullRoom && (
                              <span className="text-xs bg-stone-100 text-stone-800 px-2 py-1 rounded">
                                Grupal
                              </span>
                            )}
                            {space.access === "PRIVATE" && (
                              <span className="text-xs bg-stone-100 text-stone-800 px-2 py-1 rounded">
                                Privado
                              </span>
                            )}
                            {space.disabled && (
                              <span className="text-xs bg-stone-100 text-stone-800 px-2 py-1 rounded">
                                Deshabilitado
                              </span>
                            )}
                          </div>
                          {selectedSpace === space.id && (
                            <span className="text-xs font-medium text-stone-900 bg-stone-100 px-2 py-1 rounded">
                              Seleccionado
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
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
