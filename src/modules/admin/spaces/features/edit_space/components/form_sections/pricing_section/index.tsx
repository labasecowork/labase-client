import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Input,
  Label,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Controller } from "react-hook-form";
import { PlusIcon, Trash2Icon } from "lucide-react";
import type { PricingSectionProps } from "../../../types";

export const PricingSection: React.FC<PricingSectionProps> = ({
  register,
  control,
  errors,
  fields,
  append,
  remove,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Tarifas de Precios</CardTitle>
      <CardDescription>
        Define los precios para las diferentes modalidades y duraciones.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] items-end gap-4 p-4 bg-stone-100"
        >
          <div>
            <Label>Unidad de Tiempo</Label>
            <Controller
              name={`prices.${index}.duration`}
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HOUR">Por Hora</SelectItem>
                    <SelectItem value="DAY">Por Día</SelectItem>
                    <SelectItem value="WEEK">Por Semana</SelectItem>
                    <SelectItem value="MONTH">Por Mes</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label>Modo</Label>
            <Controller
              name={`prices.${index}.mode`}
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona modo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INDIVIDUAL">Individual</SelectItem>
                    <SelectItem value="GROUP">Grupal</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label>Monto (S/)</Label>
            <Input
              placeholder="0.00"
              type="number"
              step="0.01"
              {...register(`prices.${index}.amount`, {
                valueAsNumber: true,
              })}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => remove(index)}
            className="text-stone-500 bg-stone-200 rounded-sm m-0 hover:bg-rose-100 hover:text-rose-800 h-[40px]"
          >
            <Trash2Icon className="size-4" />
          </Button>
        </div>
      ))}
      {errors.prices && (
        <p className="text-rose-800 text-sm mt-1">{errors.prices.message}</p>
      )}
      <Button
        type="button"
        variant="outline"
        className="mt-4 w-full border-dashed bg-stone-50 shadow-none"
        onClick={() =>
          append({ duration: "HOUR", amount: 0, mode: "INDIVIDUAL" })
        }
      >
        <PlusIcon className="size-4 mr-2" />
        Añadir tarifa
      </Button>
    </CardContent>
  </Card>
);
