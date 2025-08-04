import type { SubscriberResponse } from "../../types";

interface Props {
  data: SubscriberResponse;
}

export const SubscriberCount: React.FC<Props> = ({ data }) => (
  <span>{data.count || 0} suscriptores.</span>
);
