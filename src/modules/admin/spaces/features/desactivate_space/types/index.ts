import type { Space } from "@/modules/shared/space/features/get_spaces/types";

export interface DeactivateSpaceResponse {
  space: Pick<Space, "id" | "name" | "disabled" | "createdAt">;
}
