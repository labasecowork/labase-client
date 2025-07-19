import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useRequestRegister } from "../service";
import { registerSchema } from "../schemas";
import type { RegisterData } from "../types";
import { ROUTES } from "@/routes/routes";
import { useEffect } from "react";
import { useTitle } from "@/hooks";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { mutate: registerUser, isPending } = useRequestRegister();
  const { changeTitle } = useTitle();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterData) => {
    registerUser(data, {
      onSuccess: () => {
        toast.success("Código de verificación enviado", {
          description: "Revisa tu correo electrónico para continuar",
        });
        navigate(ROUTES.Auth.VerifyAccount, { state: { email: data.email } });
      },
      onError: (error) => {
        toast.error("Ups! Algo salió mal", {
          description: error.message,
        });
      },
    });
  };

  useEffect(() => {
    changeTitle("Crear cuenta - La base");
  }, []);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">
          Crear cuenta
        </h1>
        <p className="text-stone-600 text-sm">
          Completa los siguientes campos para empezar a usar la plataforma.
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="first_name"
              className="text-sm font-medium text-stone-700 mb-2 block"
            >
              Nombre
            </Label>
            <Input
              id="first_name"
              placeholder="Juan"
              className="h-12 px-4 border-stone-300 rounded-none focus:outline-none transition-colors"
              {...register("first_name")}
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor="last_name"
              className="text-sm font-medium text-stone-700 mb-2 block"
            >
              Apellido
            </Label>
            <Input
              id="last_name"
              placeholder="Pérez"
              className="h-12 px-4 border-stone-300 rounded-none focus:outline-none transition-colors"
              {...register("last_name")}
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.last_name.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label
            htmlFor="email"
            className="text-sm font-medium text-stone-700 mb-2 block"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="tucorreo@email.com"
            className="h-12 px-4 border-stone-300 rounded-none focus:outline-none transition-colors"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label
            htmlFor="password"
            className="text-sm font-medium text-stone-700 mb-2 block"
          >
            Contraseña
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Ej: Jk92@lZp"
            className="h-12 px-4 border-stone-300 rounded-none focus:outline-none transition-colors"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="confirm_password"
            className="text-sm font-medium text-stone-700 mb-2 block"
          >
            Confirmar contraseña
          </Label>
          <Input
            id="confirm_password"
            type="password"
            placeholder="Ej: Jk92@lZp"
            className="h-12 px-4 border-stone-300 rounded-none focus:outline-none transition-colors"
            {...register("confirm_password")}
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirm_password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-stone-500 hover:bg-stone-500/90 text-white font-semibold  transition-all duration-200"
          disabled={isPending}
        >
          {isPending ? "Creando cuenta..." : "Crear cuenta"}
        </Button>
      </form>

      <div className="text-center mt-6 text-sm text-stone-600">
        ¿Ya tienes una cuenta?{" "}
        <Link
          to="/login"
          className="text-stone-900 font-semibold hover:underline"
        >
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}
