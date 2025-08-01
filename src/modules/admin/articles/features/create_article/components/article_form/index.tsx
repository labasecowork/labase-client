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
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

export const ArticleForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-8">
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
            <Input id="title" placeholder="Ej. 5 Consejos de Productividad" />
          </div>
          <div>
            <Label htmlFor="content">Contenido Principal</Label>
            <Textarea
              id="content"
              placeholder="Escribe aquí tu artículo..."
              className="min-h-[300px] resize-y"
            />
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
            <Button className="bg-stone-800 text-stone-100 border-stone-200 hover:bg-stone-600 font-sans shadow-none ">
              Cancelar
            </Button>
          </Link>
          <Button type="submit">Crear Artículo</Button>
        </CardFooter>
      </Card>
    </form>
  );
};
