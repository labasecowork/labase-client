import type { GetSpaceResponse } from "../../../features/edit_space/types";

export interface SpaceDetailsProps {
  spaceData: GetSpaceResponse;
}

export interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
  isStatus?: boolean;
  statusValue?: boolean;
}

export interface PermissionItemProps {
  label: string;
  allowed: boolean;
}
