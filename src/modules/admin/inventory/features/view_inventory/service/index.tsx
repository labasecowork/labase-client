import { useState, useEffect } from "react";
import type { Product } from "../types";
import { mockProducts } from "../constants/mock-data";

interface ApiResponse {
  data: {
    data: Product[];
    total: number;
  };
}
export const useGetProducts = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setData({
          data: {
            data: mockProducts,
            total: mockProducts.length,
          },
        });
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
      } finally {
        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading, error };
};
