import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Input,
  Label,
  Button,
} from "@/components/ui";
import { PlusCircleIcon, TrashIcon } from "lucide-react";
import type { PricingSectionProps } from "../../../types";

export const PricingSection: React.FC<PricingSectionProps> = ({
  register,
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
    <CardContent className="space-y-4">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] items-end gap-4 p-4 border rounded-lg bg-stone-50/50"
        >
          <div>
            <Label>Unidad de Tiempo</Label>
            <select
              {...register(`prices.${index}.duration`)}
              className="w-full h-10 px-3 border border-input rounded-md bg-background"
            >
              <option value="HOUR">Por Hora</option>
              <option value="DAY">Por Día</option>
              <option value="WEEK">Por Semana</option>
              <option value="MONTH">Por Mes</option>
            </select>
          </div>
          <div>
            <Label>Modo</Label>
            <select
              {...register(`prices.${index}.mode`)}
              className="w-full h-10 px-3 border border-input rounded-md bg-background"
            >
              <option value="INDIVIDUAL">Individual</option>
              <option value="GROUP">Grupal</option>
            </select>
          </div>
          <div>
            <Label>Monto (S/)</Label>{" "}
            <Input
              placeholder="0.00"
              type="number"
              step="0.01"
              {...register(`prices.${index}.amount`, { valueAsNumber: true })}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => remove(index)}
            className="text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <TrashIcon className="size-4" />
          </Button>
        </div>
      ))}
      {errors.prices && (
        <p className="text-red-500 text-sm mt-1">{errors.prices.message}</p>
      )}
      <Button
        type="button"
        variant="outline"
        className="mt-4 w-full border-dashed"
        onClick={() =>
          append({ duration: "HOUR", amount: 0, mode: "INDIVIDUAL" })
        }
      >
        <PlusCircleIcon className="size-4 mr-2" />
        Añadir Tarifa
      </Button>
    </CardContent>
  </Card>
);
