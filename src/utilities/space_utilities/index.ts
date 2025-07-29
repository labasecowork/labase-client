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
  HOUR: "Por hora",
  DAY: "Por día",
  WEEK: "Por semana",
  MONTH: "Por mes",
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
