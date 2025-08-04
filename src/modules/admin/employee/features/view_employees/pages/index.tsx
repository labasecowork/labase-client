import { Button, CustomHeader } from "@/components/ui";
import { Link } from "react-router-dom";
import { ClockIcon, PlusIcon } from "lucide-react";
import { ROUTES } from "@/routes/routes";

export default function ViewEmployeesPage() {
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
    </div>
  );
}
