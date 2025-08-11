import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui";
import {
  CheckCircle,
  Edit,
  FileText,
  PenSquare,
  Trash2,
  User,
} from "lucide-react";
import type { Article, ArticleStatus } from "../../types";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { ROUTES } from "@/routes/routes";

const StatusBadge: React.FC<{ status: ArticleStatus }> = ({ status }) => {
  const isAccepted = status === "accepted";
  const isDraft = status === "draft";

  return (
    <span
      className={`flex items-center gap-2 ${
        isAccepted
          ? "text-emerald-600"
          : isDraft
            ? "text-stone-500"
            : "text-red-500"
      }`}
    >
      {isAccepted ? (
        <CheckCircle className="size-4" />
      ) : (
        <PenSquare className="size-4" />
      )}
      {isAccepted ? "Publicado" : isDraft ? "Borrador" : "Rechazado"}
    </span>
  );
};

export const ArticlesTable: React.FC<{ articles: Article[] }> = ({
  articles,
}) => {
  const navigate = useNavigate();

  const handleEdit = (articleId: string) => {
    const editUrl = ROUTES.Admin.EditArticle.replace(":id", articleId);
    navigate(editUrl);
  };

  const handleDelete = (articleId: string) => {
    const deleteUrl = ROUTES.Admin.DeleteArticle.replace(":id", articleId);
    navigate(deleteUrl);
  };
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
          </TableRow>
        </TableHeader>

        <TableBody>
          {articles.map((article) => {
            return (
              <ContextMenu key={article.id}>
                <ContextMenuTrigger asChild>
                  <TableRow className="border-b border-stone-100 cursor-context-menu hover:bg-stone-50">
                    <TableCell
                      className="font-medium px-4 py-4 text-stone-900 max-w-xs truncate"
                      title={article.title}
                    >
                      {article.title}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-stone-700">
                      {article.author.first_name} {article.author.last_name}
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <StatusBadge status={article.status} />
                    </TableCell>
                    <TableCell className="px-4 py-4 text-stone-700">
                      {format(
                        parseISO(article.publication_timestamp),
                        "dd MMM, yyyy",
                      )}
                    </TableCell>
                  </TableRow>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem
                    className="cursor-pointer"
                    onClick={() => handleEdit(article.id)}
                  >
                    <Edit className="size-4 mr-2" />
                    Editar artículo
                  </ContextMenuItem>
                  <ContextMenuItem
                    variant="destructive"
                    className="cursor-pointer"
                    onClick={() => handleDelete(article.id)}
                  >
                    <Trash2 className="size-4 mr-2" />
                    Eliminar artículo
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
