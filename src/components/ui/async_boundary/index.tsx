import type { ReactNode } from "react";

type Props<T> = {
  isLoading: boolean;
  isError: boolean;
  data: T | undefined;
  LoadingComponent?: ReactNode;
  ErrorComponent?: ReactNode;
  children: (data: T) => ReactNode;
};

export const AsyncBoundary = <T,>({
  isLoading,
  isError,
  data,
  LoadingComponent,
  ErrorComponent,
  children,
}: Props<T>): React.ReactElement | null => {
  if (isLoading) return <>{LoadingComponent}</>;
  if (isError || !data) return <>{ErrorComponent}</>;
  return <>{children(data)}</>;
};
