import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import type { SendNewsletterData, NewsletterResponse } from "../types";

const sendNewsletter = async (
  data: SendNewsletterData
): Promise<NewsletterResponse> => {
  const response = await axiosInstance.post("/newsletter/send", data);
  return response.data;
};

const getSubscribers = async () => {
  const response = await axiosInstance.get("/newsletter/subscribers");
  return response.data;
};

export const useSendNewsletter = () => {
  return useMutation({
    mutationFn: sendNewsletter,
    mutationKey: ["send-newsletter"],
  });
};

export const useGetSubscribers = () => {
  return useQuery({
    queryKey: ["get-subscribers"],
    queryFn: getSubscribers,
  });
};
