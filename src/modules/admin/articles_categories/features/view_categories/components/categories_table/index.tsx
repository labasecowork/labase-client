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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label,
  Textarea,
} from "@/components/ui";
import { Edit, FileText, Trash2, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import type { Category } from "../../types";

import { toast } from "sonner";

export const CategoriesTable: React.FC<{ categories: Category[] }> = ({
  categories,
}) => {
  const navigate = useNavigate();

  const handleEdit = (category: Category) => {
    const editUrl = ROUTES.Admin.EditCategory.replace(":id", category.id);
    navigate(editUrl);
  };

  const handleDeleteClick = (category: Category) => {
    const deleteUrl = ROUTES.Admin.DeleteCategory.replace(":id", category.id);
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
                Descripción
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((article) => {
            const editUrl = ROUTES.Admin.EditArticle.replace(":id", article.id);
            return (
              <ContextMenu key={article.id}>
                <ContextMenuTrigger asChild>
                  <TableRow className="border-b border-stone-100 cursor-context-menu hover:bg-stone-50">
                    <TableCell
                      className="font-medium px-4 py-4 text-stone-900 max-w-xs truncate"
                      title={article.name}
                    >
                      {article.name}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-stone-700">
                      {article.description}
                    </TableCell>
                  </TableRow>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem
                    className="cursor-pointer"
                    onClick={() => handleEdit(article)}
                  >
                    <Edit className="size-4 mr-2" />
                    Editar categoría
                  </ContextMenuItem>
                  <ContextMenuItem
                    variant="destructive"
                    className="cursor-pointer"
                    onClick={() => handleDeleteClick(article)}
                  >
                    <Trash2 className="size-4 mr-2" />
                    Eliminar categoría
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            );
          })}
        </TableBody>
      </Table>

      {/* Sin modales - usando páginas dedicadas para edición y eliminación */}
    </div>
  );
};
