import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
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
import { useState, useRef, useEffect } from "react";
import { z } from "zod";

// Componentes locales
import { BannerSection } from "@/modules/admin/articles/features/create_article/components/banner_section";

// Schema para la validación del formulario
const articleSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  categoryId: z.string().min(1, "Debes seleccionar una categoría"),
  content: z.string().min(1, "El contenido es obligatorio"),
});

export type ArticleFormData = z.infer<typeof articleSchema>;

interface ArticleFormProps {
  defaultValues?: ArticleFormData;
  defaultBannerUrl?: string;
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
  submitLabel: string;
  submittingLabel: string;
  title: string;
  description: string;
}

export const ArticleForm = ({
  defaultValues = {
    title: "",
    categoryId: "",
    content: "",
  },
  defaultBannerUrl,
  onSubmit,
  isSubmitting,
  submitLabel,
  submittingLabel,
  title,
  description,
}: ArticleFormProps) => {
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategories();
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerError, setBannerError] = useState<string | null>(null);
  const contentFileRef = useRef<File | null>(null);
  const [defaultBannerLoaded, setDefaultBannerLoaded] =
    useState<boolean>(false);

  // Cargar imagen de banner por defecto si existe una URL
  useEffect(() => {
    if (defaultBannerUrl && !defaultBannerLoaded) {
      const loadDefaultBanner = async () => {
        try {
          const response = await fetch(defaultBannerUrl);
          const blob = await response.blob();
          const fileName =
            defaultBannerUrl.split("/").pop() || "default-banner.jpg";
          const file = new File([blob], fileName, { type: blob.type });
          setBanner(file);
          setDefaultBannerLoaded(true);
        } catch (error) {
          console.error("Error loading default banner:", error);
        }
      };

      loadDefaultBanner();
    }
  }, [defaultBannerUrl, defaultBannerLoaded]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues,
    mode: "onChange",
  });

  // Seleccionar categoría al cargar el formulario
  useEffect(() => {
    if (defaultValues.categoryId) {
      setValue("categoryId", defaultValues.categoryId);
    }
  }, [defaultValues.categoryId, setValue]);

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

  const handleFormSubmit = handleSubmit((data) => {
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

    onSubmit(formData);
  });

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6 mt-8">
      <BannerSection
        image={banner}
        onImageChange={setBanner}
        error={bannerError}
      />

      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
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
              value={defaultValues.categoryId}
              onValueChange={(value) => {
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
            Define el estado de publicación del artículo.
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
              <option value="accepted">Publicado</option>
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
