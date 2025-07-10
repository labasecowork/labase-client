import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema } from "@/services/auth/auth.types";
import type { RegisterData } from "@/services/auth/auth.types";
import { requestRegister } from "@/services/auth";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      await requestRegister(data);
      toast.success("Código de verificación enviado", {
        description: "Revisa tu correo electrónico para continuar",
      });
      navigate("/verify-account", { state: { email: data.email } });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Ocurrió un error");
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Cuenta</h1>
        <p className="text-gray-600">Completa los siguientes campos para empezar</p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first_name" className="text-sm font-medium text-gray-700 mb-2 block">
              Nombre
            </Label>
            <Input
              id="first_name"
              placeholder="Juan"
              className="h-12 px-4 border-gray-300 rounded-lg focus:outline-none transition-colors"
              {...register("first_name")}
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="last_name" className="text-sm font-medium text-gray-700 mb-2 block">
              Apellido
            </Label>
            <Input
              id="last_name"
              placeholder="Pérez"
              className="h-12 px-4 border-gray-300 rounded-lg focus:outline-none transition-colors"
              {...register("last_name")}
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
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
          <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2 block">
            Contraseña
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Ej: Jk92@lZp"
            className="h-12 px-4 border-gray-300 rounded-lg focus:outline-none transition-colors"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="confirm_password" className="text-sm font-medium text-gray-700 mb-2 block">
            Confirmar contraseña
          </Label>
          <Input
            id="confirm_password"
            type="password"
            placeholder="Ej: Jk92@lZp"
            className="h-12 px-4 border-gray-300 rounded-lg focus:outline-none transition-colors"
            {...register("confirm_password")}
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-sm mt-1">{errors.confirm_password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-[#fbb70f] hover:bg-[#fbb70f]/90 text-white font-semibold rounded-lg transition-all duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
        </Button>
      </form>

      <div className="text-center mt-6 text-sm text-gray-600">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login" className="text-gray-900 font-semibold hover:underline">
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}
