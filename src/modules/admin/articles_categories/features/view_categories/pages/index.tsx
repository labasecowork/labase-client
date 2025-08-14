import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { Header } from "../components/header";
import { CategoriesTable } from "../components/categories_table";
import { useGetCategories } from "../service";

export const ViewCategoriesPage = () => {
  const { changeTitle } = useTitle();
  const { data, isLoading, error } = useGetCategories();

  useEffect(() => {
    changeTitle("Gestionar categorias - La base");
  }, [changeTitle]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <Header />
      {isLoading && <p className="text-center py-4">Cargando categorías...</p>}
      {error && (
        <p className="text-red-500 text-center py-4">
          Error al cargar las categorías: {error.message}
        </p>
      )}
      {!isLoading &&
        !error &&
        data &&
        data.categories &&
        data.categories.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No hay categorías disponibles
          </p>
        )}
      {!isLoading &&
        !error &&
        data &&
        data.categories &&
        data.categories.length > 0 && (
          <CategoriesTable categories={data.categories} />
        )}
    </div>
  );
};

export default ViewCategoriesPage;
