import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Controller } from "react-hook-form";
import type { GeneralInfoSectionProps } from "../../../types";

export const GeneralInfoSection: React.FC<GeneralInfoSectionProps> = ({
  register,
  control,
  errors,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Información General</CardTitle>
      <CardDescription>
        Define el nombre, descripción y tipo de espacio.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name" className="mb-2 block">
            Nombre del Espacio
          </Label>
          <Input
            id="name"
            placeholder="Ej. Sala de Juntas A"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-rose-800 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="type" className="mb-2 block">
            Tipo de Espacio
          </Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona el tipo de espacio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FULL_ROOM">Sala Completa</SelectItem>
                  <SelectItem value="SHARED_SITE">Sitio Compartido</SelectItem>
                  <SelectItem value="UNIT">Unidad (Escritorio)</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="description" className="mb-2 block">
          Descripción (Opcional)
        </Label>
        <Textarea
          id="description"
          placeholder="Describe las características principales del espacio..."
          {...register("description")}
        />
      </div>
    </CardContent>
  </Card>
);
