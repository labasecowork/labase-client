import { AsyncBoundary } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect, useState } from "react";
import { ProductsTable } from "../components/products_table";
import { ProductsGrid } from "../components/products_grid";
import { Header } from "../components/header";
import { useGetProducts } from "../service"; // <-- 1. IMPORTA EL HOOK
import { EmptyState, ErrorState, LoadingState } from "../components";

export default function ViewInventoryPage() {
  const { changeTitle } = useTitle();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // <-- 2. USA EL HOOK PARA OBTENER LOS DATOS Y ESTADOS
  const { data, isLoading, error } = useGetProducts();

  useEffect(() => {
    changeTitle("Gestionar inventario - La base");
  }, [changeTitle]);

  const products = data?.data?.data;
  const totalProducts = data?.data?.total || 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <Header
        totalProducts={totalProducts}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <main className="mt-8">
        <AsyncBoundary
          isLoading={isLoading}
          isError={!!error}
          data={products}
          LoadingComponent={<LoadingState />}
          ErrorComponent={<ErrorState />}
          EmptyComponent={<EmptyState />}
        >
          {() =>
            viewMode === "list" ? (
              <ProductsTable products={products || []} />
            ) : (
              <ProductsGrid products={products || []} />
            )
          }
        </AsyncBoundary>
      </main>
    </div>
  );
}
