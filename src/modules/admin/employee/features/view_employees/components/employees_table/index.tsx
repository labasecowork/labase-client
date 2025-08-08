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
  CalendarIcon,
  EditIcon,
  LucideUserSquare,
  MailIcon,
  PhoneIcon,
  UserIcon,
  UserXIcon,
} from "lucide-react";
import type { Employee } from "../../types";

interface EmployeesTableProps {
  employees: Employee[];
}

export const EmployeesTable = ({ employees }: EmployeesTableProps) => {
  const handleDesactivate = (userId: string) => {
    console.log(`Desactivar empleado:`, userId);
  };

  const handleUpdate = (userId: string) => {
    console.log(`Actualizar empleado:`, userId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-stone-50 w-full">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b border-stone-200">
            <TableHead className="w-[200px] px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <UserIcon className="size-4" />
                Nombre
              </div>
            </TableHead>
            <TableHead className="w-[250px] px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <MailIcon className="size-4" />
                Email
              </div>
            </TableHead>
            <TableHead className="w-[140px] px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <PhoneIcon className="size-4" />
                Teléfono
              </div>
            </TableHead>
            <TableHead className="w-[120px] px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <LucideUserSquare className="size-4" />
                Género
              </div>
            </TableHead>
            <TableHead className="w-[180px] px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <CalendarIcon className="size-4" />
                Fecha de Nacimiento
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee, index) => {
            const { user } = employee;
            return (
              <ContextMenu key={employee.employee_id}>
                <ContextMenuTrigger asChild>
                  <TableRow
                    className={`border-b border-stone-100 hover:bg-stone-100 cursor-pointer transition-colors ${
                      index % 2 === 0 ? "bg-stone-50" : "bg-stone-50"
                    }`}
                  >
                    <TableCell className="font-medium px-4 py-4 text-stone-900 truncate max-w-[200px]">
                      {user.first_name} {user.last_name}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-stone-700 truncate max-w-[250px]">
                      {user.email}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-stone-700 truncate max-w-[140px]">
                      {user.phone}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-stone-700 truncate max-w-[120px]">
                      {user.gender}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-stone-700 truncate max-w-[180px]">
                      {formatDate(user.birth_date)}
                    </TableCell>
                  </TableRow>
                </ContextMenuTrigger>

                <ContextMenuContent className="w-48">
                  <ContextMenuItem
                    onClick={() => handleUpdate(user.id)}
                    className="cursor-pointer text-sm"
                  >
                    <EditIcon className="h-4 w-4 mr-2" />
                    Actualizar
                  </ContextMenuItem>
                  <ContextMenuItem
                    onClick={() => handleDesactivate(user.id)}
                    className="cursor-pointer text-sm"
                    variant="destructive"
                  >
                    <UserXIcon className="h-4 w-4 mr-2" />
                    Desactivar
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
