import {
  Button,
  CustomHeader,
  Card,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  AsyncBoundary,
  StatusMessage,
} from "@/components/ui";
import { Link } from "react-router-dom";
import {
  ClockIcon,
  PlusIcon,
  UserIcon,
  PhoneIcon,
  CalendarIcon,
  UserCheckIcon,
  EditIcon,
  UserXIcon,
  AlertTriangleIcon,
} from "lucide-react";
import { ROUTES } from "@/routes/routes";
import { getEmployees } from "../services";
import { useQuery } from "@tanstack/react-query";

// Tipos para la respuesta de la API
interface Employee {
  employee_id: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    user_type: string;
    profile_image: string;
    phone: string;
    birth_date: string;
    gender: string;
    status: string;
    creation_timestamp: string;
  };
}

interface EmployeesResponse {
  employees: Employee[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Componente Skeleton para el loading
function EmployeeCardSkeleton() {
  return (
    <Card className="p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center flex-col w-full">
          <div className="h-4 bg-stone-200 rounded w-3/4 mb-1"></div>
          <div className="h-3 bg-stone-200 rounded w-1/2"></div>
        </div>
        <div className="h-6 w-16 bg-stone-200 rounded-full"></div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center">
          <div className="h-4 w-4 bg-stone-200 rounded mr-2"></div>
          <div className="h-3 bg-stone-200 rounded w-24"></div>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 bg-stone-200 rounded mr-2"></div>
          <div className="h-3 bg-stone-200 rounded w-20"></div>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 bg-stone-200 rounded mr-2"></div>
          <div className="h-3 bg-stone-200 rounded w-32"></div>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 bg-stone-200 rounded mr-2"></div>
          <div className="h-3 bg-stone-200 rounded w-28"></div>
        </div>
      </div>
    </Card>
  );
}

// Componente de Loading con múltiples skeletons
function LoadingComponent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <EmployeeCardSkeleton key={index} />
      ))}
    </div>
  );
}

// Componente de Error
function ErrorComponent() {
  return (
    <StatusMessage
      title="Error al cargar empleados"
      description="Hubo un problema al obtener la lista de empleados. Por favor, intenta de nuevo."
      icon={AlertTriangleIcon}
      color="rose"
    />
  );
}

// Componente de Empty State
function EmptyStateComponent() {
  return (
    <div className="text-center py-12">
      <UserIcon className="h-12 w-12 text-stone-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-stone-900 mb-2">
        No hay empleados registrados
      </h3>
      <p className="text-stone-500 mb-4">
        Comienza agregando tu primer empleado
      </p>
      <Link to={ROUTES.Admin.CreateEmployee}>
        <Button>
          <PlusIcon className="w-4 h-4" />
          Agregar empleado
        </Button>
      </Link>
    </div>
  );
}

function EmployeeCard({ employee }: { employee: Employee }) {
  const { user } = employee;

  const handleDesactivate = () => {
    console.log(`Desactivar empleado:`, user.id);
    // Aquí implementarías la lógica para desactivar el empleado
  };

  const handleUpdate = () => {
    console.log(`Actualizar empleado:`, user.id);
    // Aquí implementarías la lógica para actualizar el empleado
    // Por ejemplo, navegar a la página de edición
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
            {/* Header: Nombre y Email horizontal + Status */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center flex-col w-full">
                <h3 className="font-semibold text-sm text-stone-900 truncate w-full text-left">
                  {user.first_name} {user.last_name}
                </h3>
                <span className="text-xs text-left text-stone-600 block w-full">
                  {user.email}
                </span>
              </div>
              <div className="mb-3">
                <span
                  className={`inline-flex px-4 py-1 text-xs font-medium rounded-full ${
                    user.status === "active"
                      ? "bg-emerald-800/10 text-emerald-800"
                      : "bg-rose-800/10 text-rose-800"
                  }`}
                >
                  {user.status === "active" ? "Activo" : "Inactivo"}
                </span>
              </div>
            </div>

            {/* Información vertical */}
            <div className="space-y-2 text-sm text-stone-600">
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

              <div className="flex items-center">
                <UserCheckIcon className="h-4 w-4 mr-2 text-stone-400 flex-shrink-0" />
                <span>Registro: {formatDate(user.creation_timestamp)}</span>
              </div>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-48">
        <ContextMenuItem onClick={handleUpdate} className="cursor-pointer">
          <EditIcon className="h-4 w-4 mr-2" />
          Actualizar
        </ContextMenuItem>
        <ContextMenuItem
          onClick={handleDesactivate}
          className="cursor-pointer"
          variant="destructive"
        >
          <UserXIcon className="h-4 w-4 mr-2" />
          Desactivar
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default function ViewEmployeesPage() {
  const { data, isLoading, isError } = useQuery<EmployeesResponse>({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  return (
    <div className="mx-auto max-w-5xl w-full px-4 mt-8">
      <div className="flex items-end justify-between mb-8">
        <CustomHeader title="Empleados" />
        <div className="flex items-center gap-2">
          <Link to={ROUTES.Admin.ViewAttendance}>
            <Button className="bg-stone-200 text-stone-700 hover:bg-stone-300">
              <ClockIcon className="w-4 h-4" />
              Asistencia
            </Button>
          </Link>
          <Link to={ROUTES.Admin.CreateEmployee}>
            <Button>
              <PlusIcon className="w-4 h-4" />
              Agregar empleado
            </Button>
          </Link>
        </div>
      </div>

      <AsyncBoundary
        isLoading={isLoading}
        isError={isError}
        data={data?.employees}
        LoadingComponent={<LoadingComponent />}
        ErrorComponent={<ErrorComponent />}
        EmptyComponent={<EmptyStateComponent />}
      >
        {(employees) => (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {employees.map((employee) => (
              <EmployeeCard key={employee.employee_id} employee={employee} />
            ))}
          </div>
        )}
      </AsyncBoundary>
    </div>
  );
}
