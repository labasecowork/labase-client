import {
  Button,
  CustomHeader,
  Card,
  CardContent,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlusIcon, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import { ROUTES } from "@/routes/routes";
import { type CreateEmployeeForm } from "../types";
import { createEmployeeSchema } from "../schema";
import { createEmployee } from "../services";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CreateEmployeePage() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateEmployeeForm>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {},
  });

  const { mutate: createEmployeeMutation, isPending } = useMutation({
    mutationFn: createEmployee,
  });

  const onSubmit = async (data: CreateEmployeeForm) => {
    const employeeData = {
      ...data,
      profile_image:
        "https://portfolio-harvey.netlify.app/images/photo-harvey.png",
      user_type: "employee",
    };

    createEmployeeMutation(employeeData, {
      onSuccess: () => {
        toast.success("Empleado creado correctamente", {
          description:
            "El empleado se ha creado correctamente, puedes verlo en la lista de empleados.",
        });
        navigate(ROUTES.Admin.ViewEmployees);
      },
      onError: () => {
        toast.error("Error al crear empleado", {
          description:
            "Sucedio un error al crear el empleado, si el error persiste, por favor contacta al administrador.",
        });
      },
    });
  };

  return (
    <div className="mx-auto max-w-5xl w-full px-4 mt-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-end justify-between mb-8">
          <CustomHeader
            title="Crear empleado"
            to={ROUTES.Admin.ViewEmployees}
          />
          <Button type="submit" disabled={isPending} className="min-w-[200px]">
            <UserPlusIcon className="w-4 h-4 mr-2" />
            {isPending ? "Creando..." : "Crear empleado"}
          </Button>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="first_name ">Nombre</Label>
                <Input
                  id="first_name"
                  type="text"
                  placeholder="Ingresa el nombre"
                  {...register("first_name")}
                  className={errors.first_name ? "border-red-500" : ""}
                />
                {errors.first_name && (
                  <p className="text-sm text-red-500">
                    {errors.first_name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name">Apellido</Label>
                <Input
                  id="last_name"
                  type="text"
                  placeholder="Ingresa el apellido"
                  {...register("last_name")}
                  className={errors.last_name ? "border-red-500" : ""}
                />
                {errors.last_name && (
                  <p className="text-sm text-red-500">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ejemplo@labase.com"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  {...register("password")}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1234567890"
                  {...register("phone")}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Fecha de nacimiento</Label>
                <Controller
                  name="birth_date"
                  control={control}
                  render={({ field }) => (
                    <Popover
                      open={isCalendarOpen}
                      onOpenChange={setIsCalendarOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          className={`w-full justify-start rounded-none hover:bg-stone-100 text-stone-500 bg-white border border-stone-200 text-left font-normal px-4 py-2 ${
                            !field.value && "text-stone-500"
                          } ${errors.birth_date ? "border-red-500" : ""}`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP", { locale: es })
                          ) : (
                            <span>Selecciona la fecha de nacimiento</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setIsCalendarOpen(false);
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.birth_date && (
                  <p className="text-sm text-red-500">
                    {errors.birth_date.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="gender">Género</Label>
                <Select
                  onValueChange={(value) =>
                    setValue(
                      "gender",
                      value as "Masculino" | "Femenino" | "Otro"
                    )
                  }
                >
                  <SelectTrigger
                    className={`w-full ${
                      errors.gender ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Selecciona el género" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Femenino">Femenino</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-sm text-red-500">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
