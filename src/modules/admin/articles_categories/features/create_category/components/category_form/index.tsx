import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Button,
  Input,
  Label,
  Textarea,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { createCategorySchema } from "../../schemas";
import type { CreateCategoryData, CreateCategoryResponse } from "../../types";
import { useCreateCategory } from "../../service";

export const CategoryForm = () => {
  const navigate = useNavigate();
  const { mutate: createCategory, isPending } = useCreateCategory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryData>({
    resolver: zodResolver(createCategorySchema) as any,
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onChange",
  });

  const onSubmit = handleSubmit((data) => {
    createCategory(
      {
        name: data.name,
        description: data.description || "",
      },
      {
        onSuccess: (response: CreateCategoryResponse) => {
          toast.success("Categoría creada exitosamente", {
            description: `La categoría "${response.category?.name || "Nueva"}" ha sido creada.`,
          });
          navigate(ROUTES.Admin.ViewCategories);
        },
        onError: (error: Error) => {
          toast.error("Error al crear la categoría", {
            description: error.message,
          });
        },
      },
    );
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6 mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Información de la Categoría</CardTitle>
          <CardDescription>
            Ingresa el nombre y la descripción de la categoría.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre de la Categoría</Label>
            <Input
              id="name"
              placeholder="Ej. Programación"
              {...register("name", { required: "El nombre es obligatorio" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              className="min-h-[150px] resize-y"
              placeholder="Ej. Tutoriales and good practices"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button
            type="button"
            onClick={() => navigate(ROUTES.Admin.ViewCategories)}
            className="bg-stone-800 text-stone-100 border-stone-200 hover:bg-stone-600 font-sans shadow-none"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full md:w-auto rounded-full px-8 py-3.5"
          >
            {isPending ? "Creando categoría..." : "Crear categoría"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
