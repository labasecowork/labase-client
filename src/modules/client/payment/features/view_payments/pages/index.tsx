import { AsyncBoundary, CustomHeader } from "@/components/ui";
import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../services";
import type { PaymentResponse } from "../types";
import { PaymentsTable } from "../components/payments_table";
import { EmptyState, ErrorState, LoadingState } from "../components";

export default function ViewPaymentsPage() {
  const { data, isLoading, isError } = useQuery<PaymentResponse[]>({
    queryKey: ["payments"],
    queryFn: getPayments,
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      <CustomHeader title="Mis pagos" />
      <div className="w-full mt-6">
        <AsyncBoundary
          isLoading={isLoading}
          isError={isError}
          data={data}
          EmptyComponent={<EmptyState />}
          LoadingComponent={<LoadingState />}
          ErrorComponent={<ErrorState />}
        >
          {(data) => <PaymentsTable data={data} />}
        </AsyncBoundary>
      </div>
    </div>
  );
}
