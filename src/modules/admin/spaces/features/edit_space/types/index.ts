import type {
  Control,
  FieldErrors,
  UseFormRegister,
  FieldArrayWithId,
} from "react-hook-form";
import type { Space } from "@/modules/shared/space/features/get_spaces/types";
export type { CreateSpaceData as EditSpaceData } from "../../create_space/types";
export type { CreateSpaceApiPayload as EditSpacePayload } from "../../create_space/types";
import type { EditSpaceData, EditSpacePayload } from ".";

export interface FormProps {
  spaceId: string;
  defaultValues: EditSpaceData;
}

export interface GeneralInfoSectionProps {
  register: UseFormRegister<EditSpaceData>;
  control: Control<EditSpaceData>;
  errors: FieldErrors<EditSpaceData>;
}

export interface ConfigSectionProps {
  register: UseFormRegister<EditSpaceData>;
  control: Control<EditSpaceData>;
  errors: FieldErrors<EditSpaceData>;
}

export interface PricingSectionProps {
  register: UseFormRegister<EditSpaceData>;
  control: Control<EditSpaceData>;
  errors: FieldErrors<EditSpaceData>;
  fields: FieldArrayWithId<EditSpaceData, "prices", "id">[];
  append: (price: EditSpaceData["prices"][number]) => void;
  remove: (index: number) => void;
}

export type { CreateSpaceResponse as EditSpaceResponse } from "../../../features/create_space/types";

export interface GetSpaceResponse {
  space: Space;
}

export interface UpdateParams {
  id: string;
  payload: EditSpacePayload;
}
