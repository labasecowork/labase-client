import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { useVerifyAccount } from "../service";
import { verifyCodeSchema } from "../schemas";
import type { VerifyCodeData } from "../types";

export default function VerifyAccountPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const { mutate: verifyAccount, isPending } = useVerifyAccount();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<VerifyCodeData>({
    resolver: zodResolver(verifyCodeSchema),
  });

  const onSubmit = (data: VerifyCodeData) => {
    if (!email) {
      toast.error("No se proporcionó un email. Vuelve a intentarlo.");
      return;
    }
    verifyAccount(
      { code: data.code, email },
      {
        onSuccess: () => {
          toast.success("¡Cuenta verificada con éxito!", {
            description: "Ahora puedes iniciar sesión",
          });
          navigate(ROUTES.Auth.Login);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  if (!email) {
    return (
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600">
            No se proporcionó un email. Por favor, vuelve a la página de
            registro.
          </p>
        </div>
        <Button
          onClick={() => navigate(ROUTES.Auth.Register)}
          className="w-full h-12 bg-[#fbb70f] hover:bg-[#fbb70f]/90 text-white font-semibold rounded-lg transition-all duration-200"
        >
          Volver a registro
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Verificar Cuenta
        </h1>
        <p className="text-gray-600">
          Hemos enviado un código de 4 dígitos a{" "}
          <span className="font-semibold text-gray-900">{email}</span>
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label
            htmlFor="code"
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Código de verificación
          </Label>
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <InputOTP maxLength={4} {...field}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
          {errors.code && (
            <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="h-12 px-15 bg-[#fbb70f] hover:bg-[#fbb70f]/90 text-white font-semibold rounded-lg transition-all duration-200"
          disabled={isPending}
        >
          {isPending ? "Verificando..." : "Verificar cuenta"}
        </Button>
      </form>
    </div>
  );
}
