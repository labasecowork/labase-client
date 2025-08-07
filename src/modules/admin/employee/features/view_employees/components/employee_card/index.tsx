import {
  Card,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui";
import {
  CalendarIcon,
  EditIcon,
  PhoneIcon,
  UserIcon,
  UserXIcon,
} from "lucide-react";
import type { Employee } from "../../types";

export const EmployeeCard = ({ employee }: { employee: Employee }) => {
  const { user } = employee;

  const handleDesactivate = () => {
    console.log(`Desactivar empleado:`, user.id);
  };

  const handleUpdate = () => {
    console.log(`Actualizar empleado:`, user.id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Card className="transition-shadow duration-200 p-6 cursor-pointer ">
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center flex-col w-full">
                <h3 className="font-semibold text-sm text-stone-900 truncate w-full text-left">
                  {user.first_name} {user.last_name}
                </h3>
                <span className="text-xs text-left text-stone-600 block w-full">
                  {user.email}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-stone-600 text-xs">
              <div className="flex items-center">
                <PhoneIcon className="h-4 w-4 mr-2 text-stone-400 flex-shrink-0" />
                <span>{user.phone}</span>
              </div>

              <div className="flex items-center">
                <UserIcon className="h-4 w-4 mr-2 text-stone-400 flex-shrink-0" />
                <span>{user.gender}</span>
              </div>

              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2 text-stone-400 flex-shrink-0" />
                <span>Nació: {formatDate(user.birth_date)}</span>
              </div>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-48">
        <ContextMenuItem
          onClick={handleUpdate}
          className="cursor-pointer text-xs"
        >
          <EditIcon className="h-4 w-4 mr-2" />
          Actualizar
        </ContextMenuItem>
        <ContextMenuItem
          onClick={handleDesactivate}
          className="cursor-pointer text-xs"
          variant="destructive"
        >
          <UserXIcon className="h-4 w-4 mr-2" />
          Desactivar
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
