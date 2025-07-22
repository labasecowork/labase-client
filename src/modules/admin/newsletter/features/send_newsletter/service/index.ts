import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors";
import type {
  SendNewsletterData,
  NewsletterResponse,
  SubscriberResponse,
} from "../types";
import type { Response } from "@/types";

const sendNewsletter = async (
  data: SendNewsletterData
): Promise<NewsletterResponse> => {
  const newData = {
    subject: data.subject,
    html: data.content,
  };
  const response = await axiosInstance.post("/bulk_email", newData);
  return response.data;
};

const getSubscribers = async (): Promise<Response<SubscriberResponse>> => {
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
