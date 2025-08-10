import { z } from "zod";
import type { createSpaceSchema } from "../schemas";
import type { Space } from "@/modules/shared/space/features/get_spaces/types";
import type {
  Control,
  FieldArrayWithId,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

export type CreateSpaceData = z.infer<typeof createSpaceSchema>;

export interface CreateSpaceApiPayload {
  name: string;
  description?: string;
  type: "UNIT" | "SHARED_SITE" | "FULL_ROOM";
  access: "PUBLIC" | "PRIVATE";
  capacityMin: number;
  capacityMax: number;
  allowByUnit: boolean;
  allowFullRoom: boolean;
  prices: {
    unit: "HOUR" | "DAY" | "WEEK" | "MONTH";
    value: number;
    mode: "INDIVIDUAL" | "GROUP";
  }[];
}

// Tipo para cuando enviamos FormData con imágenes
export type CreateSpacePayload = CreateSpaceApiPayload | FormData;

export interface CreateSpaceResponse {
  space: Space;
}

export interface GeneralInfoSectionProps {
  register: UseFormRegister<CreateSpaceData>;
  errors: FieldErrors<CreateSpaceData>;
}

export interface ConfigSectionProps {
  register: UseFormRegister<CreateSpaceData>;
  errors: FieldErrors<CreateSpaceData>;
}

export interface PricingSectionProps {
  register: UseFormRegister<CreateSpaceData>;
  control: Control<CreateSpaceData>;
  errors: FieldErrors<CreateSpaceData>;
  fields: FieldArrayWithId<CreateSpaceData, "prices", "id">[];
  append: (price: CreateSpaceData["prices"][number]) => void;
  remove: (index: number) => void;
}
