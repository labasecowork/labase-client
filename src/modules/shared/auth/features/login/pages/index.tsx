import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LoginCredentials } from "@/services/auth/auth.types";
import { loginSchema } from "@/services/auth/auth.types";
import { login } from "@/services/auth";
import { useAuth } from "@/hooks/use_auth";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

export default function LoginPage() {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginCredentials) => {
    try {
      const response = await login(data);
      handleLogin(response);
      toast.success("¡Bienvenido de vuelta!");
      navigate(ROUTES.Client.ViewReservations);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Ocurrió un error");
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Iniciar Sesión
        </h1>
        <p className="text-gray-600">
          Inicia sesión para continuar usando el sitio web.
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="tucorreo@email.com"
            className="h-12 px-4 border-gray-300 rounded-lg focus:outline-none transition-colors"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Contraseña
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            className="h-12 px-4 border-gray-300 rounded-lg focus:outline-none transition-colors"
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
            className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-[#fbb70f] hover:bg-[#fbb70f]/90 text-white font-semibold rounded-lg transition-all duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </form>

      <div className="text-center mt-6 text-sm text-gray-600">
        ¿No tienes una cuenta?{" "}
        <Link
          to="/register"
          className="text-gray-900 font-semibold hover:underline"
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
}
