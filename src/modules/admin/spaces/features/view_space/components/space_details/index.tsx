import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import {
  formatSpaceType,
  formatDurationUnit,
  formatPriceMode,
} from "@/utilities";
import {
  Edit,
  Tag,
  Users,
  Shield,
  KeyRound,
  Building2,
  Calendar,
  DollarSign,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDeactivateSpace } from "../../../../features/desactivate_space/service";
import { InfoItem } from "../info_item";
import { PermissionItem } from "../permission_item";
import type { SpaceDetailsProps } from "../../types";

export const SpaceDetails: React.FC<SpaceDetailsProps> = ({ spaceData }) => {
  const { space } = spaceData;
  const { mutate: deactivateSpace, isPending: isDeactivating } =
    useDeactivateSpace();
  const editUrl = ROUTES.Admin.EditSpace.replace(":id", space.id);

  const handleDeactivateClick = () => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres DESACTIVAR el espacio "${space.name}"?`
      )
    ) {
      deactivateSpace(space.id);
    }
  };

  return (
    <Card className="mt-8 shadow-sm border-stone-200">
      <CardHeader className="bg-stone-50 border-b border-stone-200 rounded-t-lg">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <CardTitle className="text-2xl font-serif flex items-center gap-3">
              <Building2 className="size-6 text-stone-500" />
              {space.name}
            </CardTitle>
            <CardDescription className="mt-2">
              {space.description}
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Link to={editUrl}>
              <Button variant="outline" className="bg-white">
                <Edit className="size-4 mr-2" />
                Editar
              </Button>
            </Link>
            {!space.disabled && (
              <Button
                variant="outline"
                onClick={handleDeactivateClick}
                disabled={isDeactivating}
                className="text-red-600 border hover:text-red-700"
              >
                <Trash2 className="size-4 mr-2" />
                {isDeactivating ? "Desactivando..." : "Desactivar"}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <InfoItem
            icon={Tag}
            label="Tipo"
            value={formatSpaceType(space.type)}
          />
          <InfoItem
            icon={Shield}
            label="Acceso"
            value={space.access === "PUBLIC" ? "Público" : "Privado"}
          />
          <InfoItem
            icon={Users}
            label="Capacidad"
            value={`${space.capacityMin} - ${space.capacityMax} personas`}
          />
          <InfoItem
            icon={KeyRound}
            label="Estado"
            value={space.disabled ? "Desactivado" : "Activado"}
            isStatus
            statusValue={!space.disabled}
          />
        </div>

        <div className="mt-6 pt-6 border-t border-stone-200">
          <h3 className="text-base font-semibold text-stone-800 mb-4">
            Modalidades de Reserva
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PermissionItem
              label="Reserva por Persona (Individual)"
              allowed={space.allowByUnit}
            />
            <PermissionItem
              label="Reserva de Espacio Completo (Grupal)"
              allowed={space.allowFullRoom}
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-stone-200">
          <h3 className="text-base font-semibold text-stone-800 mb-4">
            Tarifas Establecidas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {space.prices.map((price, index) => (
              <div
                key={price.id || `${price.duration}-${price.mode}-${index}`}
                className="p-4 bg-stone-50 rounded-lg border border-stone-200"
              >
                <div className="flex items-center gap-2 text-stone-600">
                  <Calendar className="size-4" />
                  <p className="font-medium text-sm">
                    {formatDurationUnit(price.duration)}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-stone-600 mt-1">
                  <Users className="size-4" />
                  <p className="font-medium text-sm">
                    {formatPriceMode(price.mode)}
                  </p>
                </div>
                <div className="flex items-baseline gap-2 mt-3">
                  <DollarSign className="size-5 text-stone-800" />
                  <p className="font-bold text-2xl text-stone-900">
                    {price.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">S/</p>
                </div>
              </div>
            ))}
            {space.prices.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No hay tarifas definidas para este espacio.
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-stone-50 border-t border-stone-200 rounded-b-lg">
        <p className="text-xs text-muted-foreground">
          ID del Espacio: {space.id}
        </p>
      </CardFooter>
    </Card>
  );
};
