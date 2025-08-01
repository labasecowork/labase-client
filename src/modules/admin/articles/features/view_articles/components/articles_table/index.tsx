import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Edit,
  FileText,
  PenSquare,
  Trash2,
  User,
} from "lucide-react";
import type { Article, ArticleStatus } from "../../types";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ROUTES } from "@/routes/routes";

const StatusBadge: React.FC<{ status: ArticleStatus }> = ({ status }) => {
  const isPublished = status === "published";
  return (
    <span
      className={`flex items-center gap-2 ${
        isPublished ? "text-emerald-600" : "text-stone-500"
      }`}
    >
      {isPublished ? (
        <CheckCircle className="size-4" />
      ) : (
        <PenSquare className="size-4" />
      )}
      {isPublished ? "Publicado" : "Borrador"}
    </span>
  );
};

export const ArticlesTable: React.FC<{ articles: Article[] }> = ({
  articles,
}) => {
  return (
    <div
      className="bg-stone-50 w-full mt-8"
      style={{ height: "calc(100vh - 250px)" }}
    >
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b border-stone-200">
            <TableHead className="px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <FileText className="size-4" />
                Título
              </div>
            </TableHead>
            <TableHead className="px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <User className="size-4" />
                Autor
              </div>
            </TableHead>
            <TableHead className="px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <CheckCircle className="size-4" />
                Estado
              </div>
            </TableHead>
            <TableHead className="px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                Fecha de Publicación
              </div>
            </TableHead>
            <TableHead className="px-4 py-4 text-right">
              <div className="font-semibold text-stone-700 text-center">
                Acciones
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {articles.map((article) => {
            const editUrl = ROUTES.Admin.EditArticle.replace(":id", article.id);
            return (
              <TableRow key={article.id} className="border-b border-stone-100">
                <TableCell
                  className="font-medium px-4 py-4 text-stone-900 max-w-xs truncate"
                  title={article.title}
                >
                  {article.title}
                </TableCell>
                <TableCell className="px-4 py-4 text-stone-700">
                  {article.author}
                </TableCell>
                <TableCell className="px-4 py-4">
                  <StatusBadge status={article.status} />
                </TableCell>
                <TableCell className="px-4 py-4 text-stone-700">
                  {format(new Date(article.publicationDate), "dd MMM, yyyy")}
                </TableCell>
                <TableCell className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link to={editUrl}>
                      <Button variant="outline" size="sm" className="bg-white">
                        <Edit className="size-3 mr-1.5" />
                        Editar
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-stone-700 hover:bg-stone-200 border border-stone-200"
                    >
                      <Trash2 className="size-3 mr-1.5" />
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
