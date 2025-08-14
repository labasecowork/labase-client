import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import { useGetCategories } from "@/modules/admin/articles_categories/features/view_categories/service";
import { ROUTES } from "@/routes/routes";
import { BannerSection } from "../banner_section";
import { useState, useRef } from "react";
import { createArticleSchema } from "../../schemas";
import type { CreateArticleData, CreateArticleResponse } from "../../types";
import { useCreateArticle } from "../../service";

export const ArticleForm = () => {
  const navigate = useNavigate();
  const { mutate: createArticle, isPending } = useCreateArticle();
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategories();
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerError, setBannerError] = useState<string | null>(null);
  const contentFileRef = useRef<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateArticleData>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      content: "",
    },
  });

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Create a simple HTML file from textarea content
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <title>Article Content</title>
  <meta charset="utf-8">
</head>
<body>
  ${e.target.value}
</body>
</html>`;

    // Convert the HTML string to a Blob/File
    const blob = new Blob([htmlContent], { type: "text/html" });
    contentFileRef.current = new File([blob], "index.html", {
      type: "text/html",
    });
  };

  const onSubmit = (data: CreateArticleData) => {
    if (!banner) {
      setBannerError("Debes agregar una imagen de portada para el artículo");
      return;
    }

    if (!contentFileRef.current) {
      // Create a file from the content if not already created by onChange
      const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <title>${data.title}</title>
  <meta charset="utf-8">
</head>
<body>
  ${data.content}
</body>
</html>`;
      const blob = new Blob([htmlContent], { type: "text/html" });
      contentFileRef.current = new File([blob], "index.html", {
        type: "text/html",
      });
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("categoryId", data.categoryId);
    formData.append("banner", banner);

    if (contentFileRef.current) {
      formData.append("content", contentFileRef.current);
    }

    createArticle(formData, {
      onSuccess: (response: CreateArticleResponse) => {
        toast.success("Artículo creado exitosamente", {
          description: `El artículo "${response.title}" ha sido creado.`,
        });
        navigate(ROUTES.Admin.ViewArticles);
      },
      onError: (error: Error) => {
        toast.error("Error al crear el artículo", {
          description: error.message,
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
      <BannerSection
        image={banner}
        onImageChange={setBanner}
        error={bannerError}
      />

      <Card>
        <CardHeader>
          <CardTitle>Contenido del Artículo</CardTitle>
          <CardDescription>
            Escribe el título y el cuerpo principal de tu artículo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Título del Artículo</Label>
            <Input
              id="title"
              placeholder="Ej. 5 Consejos de Productividad"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="content">Contenido Principal</Label>
            <Textarea
              id="content"
              placeholder="Escribe aquí tu artículo..."
              className="min-h-[300px] resize-y"
              {...register("content")}
              onChange={(e) => {
                register("content").onChange(e);
                handleContentChange(e);
              }}
            />
            {errors.content && (
              <p className="text-sm text-red-500 mt-1">
                {errors.content.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="categoryId">Categoría</Label>
            <Select
              onValueChange={(value) => {
                // Asignar el valor seleccionado al campo categoryId del formulario
                setValue("categoryId", value);
              }}
            >
              <SelectTrigger
                className={`w-full ${
                  errors.categoryId ? "border-rose-800" : ""
                }`}
              >
                <SelectValue
                  placeholder={
                    isCategoriesLoading
                      ? "Cargando categorías..."
                      : "Selecciona una categoría"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {categoriesData?.categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
                {categoriesData?.categories?.length === 0 && (
                  <SelectItem value="" disabled>
                    No hay categorías disponibles
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {errors.categoryId && (
              <p className="text-sm text-red-500 mt-1">
                {errors.categoryId.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Metadatos y Publicación</CardTitle>
          <CardDescription>
            Define el autor y el estado de publicación del artículo.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="author">Autor</Label>
            <Input id="author" placeholder="Ej. Ana García" />
          </div>
          <div>
            <Label htmlFor="status">Estado</Label>
            <select
              id="status"
              className="w-full h-10 px-3 border border-input rounded-md bg-background"
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
            </select>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Link to={ROUTES.Admin.ViewArticles}>
            <Button className="bg-stone-800 text-stone-100 border-stone-200 hover:bg-stone-600 font-sans shadow-none">
              Cancelar
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full md:w-auto rounded-full px-8 py-3.5"
          >
            {isPending ? "Creando artículo..." : "Crear artículo"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
