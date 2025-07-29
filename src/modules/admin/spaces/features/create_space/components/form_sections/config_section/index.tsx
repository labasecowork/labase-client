import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
          <Label htmlFor="capacityMin" className="mb-2 block">
            Capacidad mínima
          </Label>
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
          <Label htmlFor="capacityMax" className="mb-2 block">
            Capacidad máxima
          </Label>
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
          <Label htmlFor="access" className="mb-2 block">
            Tipo de acceso
          </Label>
          <Select {...register("access")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona el tipo de acceso" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PUBLIC">Público</SelectItem>
              <SelectItem value="PRIVATE">Privado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center space-x-3 p-3 bg-stone-100">
          <Switch id="allowByUnit" {...register("allowByUnit")} />
          <Label htmlFor="allowByUnit" className="cursor-pointer">
            Permitir reserva por persona
          </Label>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-stone-100">
          <Switch id="allowFullRoom" {...register("allowFullRoom")} />
          <Label htmlFor="allowFullRoom" className="cursor-pointer">
            Permitir reserva de espacio completo
          </Label>
        </div>
      </div>
    </CardContent>
  </Card>
);
