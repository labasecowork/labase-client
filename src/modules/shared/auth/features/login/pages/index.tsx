import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { useLogin } from "../service";
import { loginSchema } from "../schemas";
import type { LoginCredentials } from "../types";
import { useTitle } from "@/hooks";
import { useEffect } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();
  const { changeTitle } = useTitle();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginCredentials) => {
    login(data, {
      onSuccess: (response) => {
        toast.success("Bienvenido de vuelta", {
          description: "Te redirigiremos a tu panel de reservas.",
        });
        localStorage.setItem("TOKEN_AUTH", response.token);
        navigate(ROUTES.Client.ViewReservations);
      },
      onError: (error) => {
        toast.error("Ups! Algo salió mal", {
          description: error.message,
        });
      },
    });
  };

  useEffect(() => {
    changeTitle("Ingresar - La base");
  }, []);

  return (
    <div className="w-full">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">
          Ingresar a tu cuenta
        </h1>
        <p className="text-stone-600 text-sm">
          Ingresa tu correo electrónico y contraseña para continuar.
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label
            htmlFor="email"
            className="text-sm font-medium text-stone-700 mb-2 block"
          >
            Correo electrónico
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Ej. tucorreo@email.com"
            className="h-12 px-4 border-stone-300 focus:outline-none transition-colors rounded-none"
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
            placeholder="Ej. asgSWas%!ga12"
            className="h-12 px-4 border-stone-300 rounded-none focus:outline-none transition-colors"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="text-right">
          <Link
            to="/recover-password"
            className="text-sm text-stone-600 hover:text-stone-900 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-stone-500 hover:bg-stone-500/90 text-white font-semibold  transition-all duration-200"
          disabled={isPending}
        >
          {isPending ? "Iniciando sesión..." : "Ingresar"}
        </Button>
      </form>

      <div className="text-center mt-6 text-sm text-stone-600">
        ¿No tienes una cuenta?{" "}
        <Link
          to="/register"
          className="text-stone-900 font-semibold hover:underline"
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
}
