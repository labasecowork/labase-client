import { z } from "zod";
import { sendNewsletterSchema } from "../schemas";

export type SendNewsletterData = z.infer<typeof sendNewsletterSchema>;

export interface NewsletterResponse {
  message: string;
  recipients_count: number;
}
