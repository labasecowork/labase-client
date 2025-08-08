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
  StatusMessage,
} from "@/components/ui";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, PencilIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useState, useMemo } from "react";
import { ROUTES } from "@/routes/routes";
import { type EditEmployeeForm } from "../types";
import { editEmployeeSchema } from "../schema";
import { editEmployee, getEmployee } from "../services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useTitle } from "@/hooks";
import {
  ExclamationTriangleIcon,
  UserMinusIcon,
} from "@heroicons/react/24/solid";

export default function EditEmployeePage() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [originalValues, setOriginalValues] = useState<EditEmployeeForm | null>(
    null
  );
  const params = useParams();
  const navigate = useNavigate();
  const { changeTitle } = useTitle();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<EditEmployeeForm>({
    resolver: zodResolver(editEmployeeSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone: "",
      birth_date: new Date(),
      gender: "Masculino",
    },
  });

  const watchedValues = useWatch({ control });

  const hasChanges = useMemo(() => {
    if (!originalValues || !watchedValues) return false;

    const fieldsToCompare: (keyof EditEmployeeForm)[] = [
      "first_name",
      "last_name",
      "email",
      "password",
      "phone",
      "birth_date",
      "gender",
    ];

    return fieldsToCompare.some((field) => {
      const currentValue = watchedValues[field];
      const originalValue = originalValues[field];

      if (field === "birth_date") {
        const currentDate =
          currentValue instanceof Date ? currentValue.getTime() : null;
        const originalDate =
          originalValue instanceof Date ? originalValue.getTime() : null;
        return currentDate !== originalDate;
      }

      return currentValue !== originalValue;
    });
  }, [originalValues, watchedValues]);

  const {
    data: employee,
    isLoading: isLoadingEmployee,
    isError,
  } = useQuery({
    queryKey: ["employee", params.id],
    queryFn: () => getEmployee(params.id as string),
    enabled: !!params.id,
  });

  const { mutate: editEmployeeMutation, isPending } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditEmployeeForm }) =>
      editEmployee(id, data),
  });

  const onSubmit = async (data: EditEmployeeForm) => {
    const employeeData = {
      ...data,
      profile_image:
        "https://portfolio-harvey.netlify.app/images/photo-harvey.png",
      user_type: "employee",
    };

    editEmployeeMutation(
      {
        id: params.id as string,
        data: employeeData,
      },
      {
        onSuccess,
        onError,
      }
    );
  };

  const onSuccess = () => {
    toast.success("Empleado editado correctamente", {
      description:
        "El empleado se ha editado correctamente, puedes verlo en la lista de empleados.",
    });
    navigate(ROUTES.Admin.ViewEmployees);
  };

  const onError = () => {
    toast.error("Error al editar empleado", {
      description:
        "Sucedio un error al editar el empleado, si el error persiste, por favor contacta al administrador.",
    });
  };

  useEffect(() => {
    changeTitle("Editar empleado - La base");
  }, [changeTitle]);

  useEffect(() => {
    console.log(employee);
    if (employee) {
      const employeeData = {
        first_name: employee.user.first_name,
        last_name: employee.user.last_name,
        email: employee.user.email,
        password: "",
        phone: employee.user.phone,
        birth_date: new Date(employee.user.birth_date),
        gender: employee.user.gender as "Masculino" | "Femenino" | "Otro",
      };

      setValue("first_name", employeeData.first_name);
      setValue("last_name", employeeData.last_name);
      setValue("email", employeeData.email);
      setValue("password", employeeData.password);
      setValue("phone", employeeData.phone);
      setValue("birth_date", employeeData.birth_date);
      setValue("gender", employeeData.gender);

      setOriginalValues(employeeData);
    }
  }, [employee, setValue]);

  if (!params.id) {
    return (
      <div className="mx-auto max-w-4xl w-full px-4 mt-8">
        <CustomHeader title="Editar empleado" to={ROUTES.Admin.ViewEmployees} />
        <div className="mt-4">
          <StatusMessage
            title="No se encontró el empleado"
            description="El empleado no existe, por favor verifica la URL o regresa a la lista de empleados, si el error persiste, contacta al administrador."
            icon={UserMinusIcon}
            color="stone"
          />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-4xl w-full px-4 mt-8">
        <CustomHeader title="Editar empleado" to={ROUTES.Admin.ViewEmployees} />
        <div className="mt-4">
          <StatusMessage
            title="Error al obtener el empleado"
            description="Sucedio un error al obtener el empleado, si el error persiste, contacta al administrador."
            icon={ExclamationTriangleIcon}
          />
        </div>
      </div>
    );
  }

  if (isLoadingEmployee)
    return (
      <div className="mx-auto max-w-4xl w-full px-4 mt-8">
        <CustomHeader title="Editar empleado" to={ROUTES.Admin.ViewEmployees} />
        <div className="w-full h-[600px] mt-4 bg-stone-50 animate-pulse"></div>
      </div>
    );

  return (
    <div className="mx-auto max-w-4xl w-full px-4 mt-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-end justify-between mb-8">
          <CustomHeader
            title="Editar empleado"
            to={ROUTES.Admin.ViewEmployees}
          />
          <Button
            type="submit"
            disabled={isPending || !hasChanges}
            className="min-w-[200px]"
          >
            <PencilIcon className="w-4 h-4 mr-2" />
            {isPending ? "Editando..." : "Editar empleado"}
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
                <Label htmlFor="email">Correo electrónico</Label>
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
