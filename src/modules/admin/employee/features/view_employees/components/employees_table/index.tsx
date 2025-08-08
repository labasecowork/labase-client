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
  CircleCheck,
  EditIcon,
  Loader2,
  LucideUserSquare,
  MailIcon,
  PhoneIcon,
  UserIcon,
  UserPlusIcon,
  UserXIcon,
} from "lucide-react";
import type { Employee } from "../../types";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateEmployee, desactivateEmployee } from "../../services";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

interface Props {
  employees: Employee[];
}
export const EmployeesTable = ({ employees }: Props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync: mutateDesactivate, isPending: isPendingDesactivate } =
    useMutation({
      mutationFn: desactivateEmployee,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["employees"] });
        toast.success("Empleado desactivado correctamente", {
          description: "El empleado ha sido desactivado correctamente.",
        });
      },
      onError: () => {
        toast.error("Error al desactivar empleado", {
          description: "El empleado no ha sido desactivado correctamente.",
        });
      },
    });

  const { mutateAsync: mutateActivate, isPending: isPendingActivate } =
    useMutation({
      mutationFn: activateEmployee,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["employees"] });
        toast.success("Empleado activado correctamente", {
          description: "El empleado ha sido activado correctamente.",
        });
      },
      onError: () => {
        toast.error("Error al activar empleado", {
          description: "El empleado no ha sido activado correctamente.",
        });
      },
    });

  const handleDesactivate = (userId: string) => {
    toast.promise(mutateDesactivate(userId), {
      loading: "Desactivando empleado...",
    });
  };

  const handleActivate = (userId: string) => {
    toast.promise(mutateActivate(userId), {
      loading: "Activando empleado...",
    });
  };

  const handleUpdate = (userId: string) => {
    navigate(ROUTES.Admin.EditEmployee.replace(":id", userId));
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
            <TableHead className="w-[120px] px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <CircleCheck className="size-4" />
                Estado
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
                    <TableCell className="px-4 py-4 text-stone-700 truncate max-w-[120px] font-mono tracking-tighter text-xs">
                      {user.status === "active" ? (
                        <span className="bg-emerald-800/10 text-emerald-800 px-2 py-1 rounded-md">
                          Activo
                        </span>
                      ) : (
                        <span className="bg-rose-800/10 text-rose-800 px-2 py-1 rounded-md">
                          Inactivo
                        </span>
                      )}
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
                  {user.status === "active" ? (
                    <ContextMenuItem
                      onClick={() => handleDesactivate(user.id)}
                      className="cursor-pointer text-sm"
                      variant="destructive"
                      disabled={isPendingDesactivate}
                    >
                      {isPendingDesactivate ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <UserXIcon className="h-4 w-4 mr-2" />
                      )}
                      Desactivar
                    </ContextMenuItem>
                  ) : (
                    <ContextMenuItem
                      onClick={() => handleActivate(user.id)}
                      className="cursor-pointer text-sm"
                      variant="default"
                      disabled={isPendingActivate}
                    >
                      {isPendingActivate ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <UserPlusIcon className="h-4 w-4 mr-2" />
                      )}
                      Activar
                    </ContextMenuItem>
                  )}
                </ContextMenuContent>
              </ContextMenu>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
