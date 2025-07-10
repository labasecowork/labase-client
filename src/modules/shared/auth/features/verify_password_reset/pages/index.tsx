import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  verifyCodeSchema,
  type VerifyCodeData,
} from "@/services/auth/auth.types";
import { verifyPasswordResetCode } from "@/services/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

export default function VerifyPasswordResetPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyCodeData>({
    resolver: zodResolver(verifyCodeSchema),
  });

  const onSubmit = async (data: VerifyCodeData) => {
    try {
      await verifyPasswordResetCode(data.code, email);
      toast.success("Código verificado", {
        description: "Ahora puedes crear una nueva contraseña",
      });
      navigate(ROUTES.Auth.ChangePassword, {
        state: { email, code: data.code },
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Ocurrió un error");
    }
  };

  if (!email) {
    return (
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600">
            No se proporcionó un email. Por favor, vuelve a la página anterior.
          </p>
        </div>
        <Button
          onClick={() => navigate(ROUTES.Auth.RecoverPassword)}
          className="w-full h-12 bg-[#fbb70f] hover:bg-[#fbb70f]/90 text-white font-semibold rounded-lg transition-all duration-200"
        >
          Volver
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Verificar Código</h1>
        <p className="text-gray-600">
          Hemos enviado un código de 4 dígitos a{" "}
          <span className="font-semibold text-gray-900">{email}</span>
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="code" className="text-sm font-medium text-gray-700 mb-2 block">
            Código de verificación
          </Label>
          <Input
            id="code"
            placeholder="1234"
            className="h-12 px-4 border-gray-300 rounded-lg focus:outline-none transition-colors text-center text-lg font-mono tracking-widest"
            {...register("code")}
            maxLength={4}
          />
          {errors.code && (
            <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-[#fbb70f] hover:bg-[#fbb70f]/90 text-white font-semibold rounded-lg transition-all duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Verificando..." : "Verificar código"}
        </Button>
      </form>
    </div>
  );
} 