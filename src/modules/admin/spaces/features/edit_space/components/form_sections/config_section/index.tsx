import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Switch,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Controller } from "react-hook-form";
import type { ConfigSectionProps } from "../../../types";

export const ConfigSection: React.FC<ConfigSectionProps> = ({
  register,
  control,
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
            Capacidad Mínima
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
            Capacidad Máxima
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
            Tipo de Acceso
          </Label>
          <Controller
            name="access"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona el tipo de acceso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PUBLIC">Público</SelectItem>
                  <SelectItem value="PRIVATE">Privado</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <div className="flex items-center space-x-3 p-3 bg-stone-100 rounded-md">
          <Switch id="allowByUnit" {...register("allowByUnit")} />
          <Label htmlFor="allowByUnit" className="cursor-pointer">
            Permitir reserva por persona
          </Label>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-stone-100 rounded-md">
          <Switch id="allowFullRoom" {...register("allowFullRoom")} />
          <Label htmlFor="allowFullRoom" className="cursor-pointer">
            Permitir reserva de espacio completo
          </Label>
        </div>
      </div>
    </CardContent>
  </Card>
);
