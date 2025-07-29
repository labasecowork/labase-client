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
  Calendar,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDeactivateSpace } from "../../../../features/desactivate_space/service";
import { InfoItem } from "../info_item";
import { PermissionItem } from "../permission_item";
import type { SpaceDetailsProps } from "../../types";
import { BuildingOfficeIcon } from "@heroicons/react/24/solid";

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
    <Card className="mt-8 border-stone-200">
      <CardHeader className="">
        <div className="flex justify-between items-end flex-wrap gap-4">
          <div className="w-full">
            <CardTitle className="text-2xl flex justify-between items-end gap-3">
              <div className="flex items-center gap-2 font-serif font-semibold">
                <BuildingOfficeIcon className="size-6 text-stone-600" />
                {space.name}
              </div>
              <div className="flex items-center gap-2">
                {!space.disabled && (
                  <Button
                    onClick={handleDeactivateClick}
                    disabled={isDeactivating}
                    className="text-stone-800 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 border-none font-sans shadow-none"
                  >
                    <Trash2 className="size-4 mr-2" />
                    {isDeactivating ? "Desactivando..." : "Desactivar"}
                  </Button>
                )}

                <Link to={editUrl}>
                  <Button className="bg-stone-800 text-stone-100 border-stone-200 hover:bg-stone-600 font-sans shadow-none">
                    <Edit className="size-4 mr-2" />
                    Editar
                  </Button>
                </Link>
              </div>
            </CardTitle>
            <CardDescription className="mt-4">
              {space.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-stone-100 p-6">
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

        <div className="my-4">
          <h3 className="text-lg font-semibold font-serif text-stone-800 mb-2">
            Modalidades de reserva
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PermissionItem
              label="Reserva por persona (individual)"
              allowed={space.allowByUnit}
            />
            <PermissionItem
              label="Reserva de espacio completo (grupal)"
              allowed={space.allowFullRoom}
            />
          </div>
        </div>

        <div className="my-4">
          <h3 className="text-lg font-semibold font-serif text-stone-800 mb-2">
            Tarifas establecidas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {space.prices.map((price, index) => (
              <div
                key={price.id || `${price.duration}-${price.mode}-${index}`}
                className="p-4 bg-stone-100 "
              >
                <div className="flex items-center gap-2 text-stone-600">
                  <Calendar className="size-4" />
                  <p className="font-medium text-xs">
                    {formatDurationUnit(price.duration)}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-stone-600 mt-1">
                  <Users className="size-4" />
                  <p className="font-medium text-xs">
                    {formatPriceMode(price.mode)}
                  </p>
                </div>
                <div className="flex items-baseline gap-2 ">
                  <p className="text-sm text-muted-foreground">S/</p>
                  <p className="font-bold text-2xl text-stone-900 font-serif">
                    {price.amount.toFixed(2)}
                  </p>
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
      <CardFooter className="bg-stone-50 border-t border-stone-200 rounded-b-lg ">
        <p className="text-xs text-muted-foreground px-4">
          ID del Espacio: {space.id}
        </p>
      </CardFooter>
    </Card>
  );
};
