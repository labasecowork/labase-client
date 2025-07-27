import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Switch,
} from "@/components/ui";
import type { ConfigSectionProps } from "../../../types";

export const ConfigSection: React.FC<ConfigSectionProps> = ({
  register,
  errors,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Configuración y Permisos</CardTitle>
      <CardDescription>
        Establece la capacidad, el acceso y las modalidades de reserva.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="capacityMin">Capacidad Mínima</Label>
          <Input
            id="capacityMin"
            type="number"
            {...register("capacityMin", { valueAsNumber: true })}
          />
          {errors.capacityMin && (
            <p className="text-red-500 text-sm mt-1">
              {errors.capacityMin.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="capacityMax">Capacidad Máxima</Label>
          <Input
            id="capacityMax"
            type="number"
            {...register("capacityMax", { valueAsNumber: true })}
          />
          {errors.capacityMax && (
            <p className="text-red-500 text-sm mt-1">
              {errors.capacityMax.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="access">Tipo de Acceso</Label>
          <select
            {...register("access")}
            className="w-full h-10 px-3 border border-input rounded-md bg-background"
          >
            <option value="PUBLIC">Público</option>
            <option value="PRIVATE">Privado</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
        <div className="flex items-center space-x-3 p-3 bg-stone-50 rounded-md">
          <Switch id="allowByUnit" {...register("allowByUnit")} />
          <Label htmlFor="allowByUnit" className="cursor-pointer">
            Permitir reserva por persona
          </Label>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-stone-50 rounded-md">
          <Switch id="allowFullRoom" {...register("allowFullRoom")} />
          <Label htmlFor="allowFullRoom" className="cursor-pointer">
            Permitir reserva de espacio completo
          </Label>
        </div>
      </div>
    </CardContent>
  </Card>
);
