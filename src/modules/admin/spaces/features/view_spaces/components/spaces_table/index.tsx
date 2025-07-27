import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import {
  BuildingIcon,
  CheckCircle,
  SlidersHorizontal,
  TagIcon,
  UsersIcon,
  XCircle,
} from "lucide-react";
import type { Space } from "../../types";
import { formatSpaceType } from "@/utilities";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

export const SpacesTable: React.FC<{ spaces: Space[] }> = ({ spaces }) => {
  const navigate = useNavigate();

  const handleRowClick = (spaceId: string) => {
    const url = ROUTES.Admin.ViewSpace.replace(":id", spaceId);
    navigate(url);
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
                <BuildingIcon className="size-4" />
                Nombre del Espacio
              </div>
            </TableHead>
            <TableHead className="px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <TagIcon className="size-4" />
                Tipo
              </div>
            </TableHead>
            <TableHead className="px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <UsersIcon className="size-4" />
                Capacidad
              </div>
            </TableHead>
            <TableHead className="px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <SlidersHorizontal className="size-4" />
                Estado
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {spaces.map((space) => (
            <TableRow
              key={space.id}
              onClick={() => handleRowClick(space.id)}
              className="border-b border-stone-100 hover:bg-stone-100 cursor-pointer transition-colors"
            >
              <TableCell className="font-medium px-4 py-4 text-stone-900">
                {space.name}
              </TableCell>
              <TableCell className="px-4 py-4 text-stone-700">
                {formatSpaceType(space.type)}
              </TableCell>
              <TableCell className="px-4 py-4 text-stone-700">
                {space.capacityMin} - {space.capacityMax}
              </TableCell>
              <TableCell className="px-4 py-4">
                {space.disabled ? (
                  <span className="flex items-center gap-2 text-red-600">
                    <XCircle className="size-4" /> Desactivado
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-emerald-600">
                    <CheckCircle className="size-4" /> Activado
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
