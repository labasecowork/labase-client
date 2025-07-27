import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
} from "@/components/ui";
import type { GeneralInfoSectionProps } from "../../../types";

export const GeneralInfoSection: React.FC<GeneralInfoSectionProps> = ({
  register,
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
          <Label htmlFor="name">Nombre del Espacio</Label>
          <Input
            id="name"
            placeholder="Ej. Sala de Juntas A"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="type">Tipo de Espacio</Label>
          <select
            {...register("type")}
            className="w-full h-10 px-3 border border-input rounded-md bg-background"
          >
            <option value="FULL_ROOM">Sala Completa</option>
            <option value="SHARED_SITE">Sitio Compartido</option>
            <option value="UNIT">Unidad (Escritorio)</option>
          </select>
        </div>
      </div>
      <div>
        <Label htmlFor="description">Descripción (Opcional)</Label>
        <Textarea
          id="description"
          placeholder="Describe las características principales del espacio..."
          {...register("description")}
        />
      </div>
    </CardContent>
  </Card>
);
