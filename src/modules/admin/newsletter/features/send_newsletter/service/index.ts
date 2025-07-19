import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import type { SendNewsletterData, NewsletterResponse } from "../types";

const sendNewsletter = async (
  data: SendNewsletterData
): Promise<NewsletterResponse> => {
  const response = await axiosInstance.post("/newsletter/send", data);
  return response.data;
};

export const useSendNewsletter = () => {
  return useMutation({
    mutationFn: sendNewsletter,
    mutationKey: ["send-newsletter"],
  });
};
