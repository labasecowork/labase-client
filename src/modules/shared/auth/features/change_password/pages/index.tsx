import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { useConfirmNewPassword } from "../service";
import { changePasswordSchema } from "../schemas";
import type { ChangePasswordData } from "../types";

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const code = location.state?.code;

  const { mutate: confirmPassword, isPending } = useConfirmNewPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = (data: ChangePasswordData) => {
    if (!email) {
      toast.error("No se proporcionó un email. Vuelve a intentarlo.");
      return;
    }
    confirmPassword(
      { ...data, email },
      {
        onSuccess: () => {
          toast.success("Contraseña actualizada", {
            description:
              "Tu contraseña ha sido cambiada. Ya puedes iniciar sesión",
          });
          navigate(ROUTES.Auth.Login);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  if (!email || !code) {
    return (
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600">
            Información inválida. Por favor, inicia el proceso de recuperación
            de nuevo.
          </p>
        </div>
        <Button
          onClick={() => navigate(ROUTES.Auth.RecoverPassword)}
          className="w-full h-12 bg-[#fbb70f] hover:bg-[#fbb70f]/90 text-white font-semibold rounded-lg transition-all duration-200"
        >
          Ir a Recuperar Contraseña
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Crear Nueva Contraseña
        </h1>
        <p className="text-gray-600">
          Tu nueva contraseña debe ser diferente a las anteriores
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Nueva contraseña
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••••"
            className="h-12 px-4 border-gray-300 rounded-lg focus:outline-none transition-colors"
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
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Confirmar contraseña
          </Label>
          <Input
            id="confirm_password"
            type="password"
            placeholder="••••••••••"
            className="h-12 px-4 border-gray-300 rounded-lg focus:outline-none transition-colors"
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
          className="w-full h-12 bg-[#fbb70f] hover:bg-[#fbb70f]/90 text-white font-semibold rounded-lg transition-all duration-200"
          disabled={isPending}
        >
          {isPending ? "Guardando..." : "Guardar nueva contraseña"}
        </Button>
      </form>
    </div>
  );
}
