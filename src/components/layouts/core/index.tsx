import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createQueryClient } from "@/utilities";
import { MODE } from "@/config";

interface Props {
  children: React.ReactNode;
}

export default function Core({ children }: Props) {
  return (
    <QueryClientProvider client={createQueryClient()}>
      {children}
      {MODE && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
