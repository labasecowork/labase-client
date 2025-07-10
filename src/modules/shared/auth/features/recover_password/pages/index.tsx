import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  forgotPasswordSchema,
  type ForgotPasswordData,
} from "@/services/auth/auth.types";
import { requestPasswordReset } from "@/services/auth";
import { Link, useNavigate } from "react-router-dom";

export default function RecoverPasswordPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      await requestPasswordReset(data);
      toast.success("Solicitud enviada", {
        description:
          "Si existe una cuenta con ese email, recibirás un código para resetear tu contraseña",
      });
      navigate("/verify-password-reset", { state: { email: data.email } });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Ocurrió un error");
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recuperar Contraseña</h1>
        <p className="text-gray-600">
          Ingresa tu email y te enviaremos un código para recuperar tu cuenta
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

        <Button
          type="submit"
          className="w-full h-12 bg-[#fbb70f] hover:bg-[#fbb70f]/90 text-white font-semibold rounded-lg transition-all duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Enviar código de recuperación"}
        </Button>
      </form>

      <div className="text-center mt-6 text-sm text-gray-600">
        <Link to="/login" className="text-gray-900 font-semibold hover:underline">
          Volver a iniciar sesión
        </Link>
      </div>
    </div>
  );
}
