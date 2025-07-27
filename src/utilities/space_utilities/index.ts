import type {
  SpaceType,
  DurationUnit,
  PriceMode,
} from "@/modules/shared/space/features/get_spaces/types";

const spaceTypeMap: Record<SpaceType, string> = {
  FULL_ROOM: "Sala Completa",
  SHARED_SITE: "Sitio Compartido",
  UNIT: "Unidad",
};

export const formatSpaceType = (type: SpaceType): string => {
  return spaceTypeMap[type] || type;
};

const durationUnitMap: Record<DurationUnit, string> = {
  HOUR: "Por Hora",
  DAY: "Por Día",
  WEEK: "Por Semana",
  MONTH: "Por Mes",
};

export const formatDurationUnit = (unit: DurationUnit): string => {
  return durationUnitMap[unit] || unit;
};

const priceModeMap: Record<PriceMode, string> = {
  INDIVIDUAL: "Individual",
  GROUP: "Grupal",
};

export const formatPriceMode = (mode: PriceMode): string => {
  return priceModeMap[mode] || mode;
};
