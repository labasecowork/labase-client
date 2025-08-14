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
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  defaultValues?: CategoryFormData;
  onSubmit: (data: CategoryFormData) => void;
  isSubmitting: boolean;
  submitLabel: string;
  submittingLabel: string;
  title: string;
  description: string;
}

export const CategoryForm = ({
  defaultValues = {
    name: "",
    description: "",
  },
  onSubmit,
  isSubmitting,
  submitLabel,
  submittingLabel,
  title,
  description,
}: CategoryFormProps) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues,
    mode: "onChange",
  });

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6 mt-8">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre de la Categoría</Label>
            <Input
              id="name"
              placeholder="Ej. Programación"
              {...register("name")}
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
              placeholder="Ej. Tutoriales y buenas prácticas"
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
            disabled={isSubmitting}
            className="w-full md:w-auto rounded-full px-8 py-3.5"
          >
            {isSubmitting ? submittingLabel : submitLabel}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
