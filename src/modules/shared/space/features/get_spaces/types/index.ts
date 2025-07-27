export type SpaceType = "UNIT" | "SHARED_SITE" | "FULL_ROOM";
export type AccessType = "PUBLIC" | "PRIVATE";
export type DurationUnit = "HOUR" | "DAY" | "WEEK" | "MONTH";
export type PriceMode = "INDIVIDUAL" | "GROUP";

export interface Space {
  id: string;
  name: string;
  description: string | null;
  type: SpaceType;
  access: AccessType;
  capacityMin: number;
  capacityMax: number;
  allowByUnit: boolean;
  allowFullRoom: boolean;
  disabled: boolean;
  createdAt: string;
  prices: Price[];
}

export interface Price {
  id: string;
  duration: DurationUnit;
  amount: number;
  mode: PriceMode;
}
export interface SpacesResponse {
  spaces: Space[];
}
