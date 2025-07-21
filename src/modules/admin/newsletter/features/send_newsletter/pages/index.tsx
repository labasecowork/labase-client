import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CustomHeader } from "@/components/ui";
import { useTitle } from "@/hooks";
import { Users, ChevronDown } from "lucide-react";
import { SubscribersTable } from "../components";
import { useSendNewsletter } from "../service";
import { sendNewsletterSchema } from "../schemas";
import type { SendNewsletterData } from "../types";
import { subscribedEmails } from "../constants";

export default function SendNewsletterPage() {
  const { changeTitle } = useTitle();
  const { mutate: sendNewsletter, isPending } = useSendNewsletter();
  // const { data: subscribers } = useGetSubscribers();
  const [isSubscribersExpanded, setIsSubscribersExpanded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SendNewsletterData>({
    resolver: zodResolver(sendNewsletterSchema),
  });

  const onSubmit = (data: SendNewsletterData) => {
    sendNewsletter(data, {
      onSuccess: (response) => {
        toast.success("Newsletter enviado exitosamente", {
          description: `Se envió a ${response.recipients_count} suscriptores`,
        });
        reset();
      },
      onError: (error) => {
        toast.error("Error al enviar newsletter", {
          description:
            error.message || "Hubo un problema al enviar el newsletter",
        });
      },
    });
  };

  useEffect(() => {
    changeTitle("Enviar Newsletter - La base");
  }, [changeTitle]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between gap-4 mb-8">
        <CustomHeader title="Enviar Newsletter" />
      </div>

      {/* Accordión para móvil */}
      <div className="lg:hidden mb-6">
        <div className="border border-stone-200 bg-white">
          <div
            onClick={() => setIsSubscribersExpanded(!isSubscribersExpanded)}
            className="p-4 cursor-pointer hover:bg-stone-50 transition-colors duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="size-5 text-stone-600" />
                <div>
                  <h3 className="font-semibold text-stone-900">
                    Lista de Suscriptores
                  </h3>
                  <p className="text-sm text-stone-600">
                    {subscribedEmails.length} usuarios suscritos
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`size-5 text-stone-400 transition-transform duration-200 ${
                  isSubscribersExpanded ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>

          {isSubscribersExpanded && (
            <div className="border-t border-stone-200 p-4">
              <div className="bg-stone-50 overflow-hidden border border-stone-200">
                <div className="max-h-[400px] overflow-y-auto">
                  <SubscribersTable />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario */}
        <div className="col-span-1 lg:col-span-1">
          <p className="text-sm text-stone-600 mb-4">
            Completa los campos para enviar el newsletter, con esto se enviara
            un correo electrónico a todos los suscriptores, tienes un total de{" "}
            {subscribedEmails.length} suscriptores.
          </p>

          <div className="">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label
                  htmlFor="subject"
                  className="text-sm font-medium text-stone-700 mb-2 block"
                >
                  Asunto
                </Label>
                <Input
                  id="subject"
                  placeholder="Asunto del newsletter"
                  className="h-12 px-4 border-stone-300 focus:outline-none transition-colors rounded-none"
                  {...register("subject")}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="content"
                  className="text-sm font-medium text-stone-700 mb-2 block"
                >
                  Descripción del mail
                </Label>
                <Textarea
                  id="content"
                  placeholder="Escribe el contenido de tu newsletter aquí..."
                  className="min-h-[390px] px-4 py-3 border-stone-300 focus:outline-none transition-colors rounded-none resize-none"
                  {...register("content")}
                />
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.content.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 bg-stone-500 hover:bg-stone-400 text-white font-medium  transition-all duration-200"
              >
                {isPending ? "Enviando..." : "Enviar Newsletter"}
              </Button>
            </form>
          </div>
        </div>
        {/* Tabla de suscriptores */}
        <div className="hidden lg:block lg:col-span-1">
          {false ? (
            <div className="bg-stone-50 overflow-hidden animate-pulse max-h-[675px] h-full"></div>
          ) : (
            <div className="bg-stone-50 overflow-hidden">
              <div className="max-h-[675px] overflow-y-auto">
                <SubscribersTable />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
