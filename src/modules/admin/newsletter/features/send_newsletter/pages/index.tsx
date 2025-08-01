import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CustomHeader, AsyncBoundary, StatusMessage } from "@/components/ui";
import { useTitle } from "@/hooks";
import { Users, ChevronDown } from "lucide-react";
import { SubscribersTable } from "../components";
import { useGetSubscribers, useSendNewsletter } from "../service";
import { sendNewsletterSchema } from "../schemas";
import type { SendNewsletterData, SubscriberResponse } from "../types";
import type { UseFormReturn } from "react-hook-form";
import { ExclamationTriangleIcon, UsersIcon } from "@heroicons/react/24/solid";

// Componente para el estado de carga
function LoadingState() {
  return (
    <div className="bg-stone-50 overflow-hidden animate-pulse max-h-[200px] h-full"></div>
  );
}

// Componente para el estado de error
function ErrorState() {
  return (
    <StatusMessage
      color="rose"
      title="Error al cargar los suscriptores"
      description="Sucedio un error al cargar los suscriptores, porfavor intenta nuevamente, si el problema persiste, por favor contacta al soporte."
      icon={ExclamationTriangleIcon}
    />
  );
}

// Componente para el estado vacío
function EmptyState() {
  return (
    <StatusMessage
      color="stone"
      title="No se encontraron suscriptores"
      description="Aún no tienes suscriptores registrados en tu newsletter, para que un usuario se pueda suscribir tiene que registrase en la página."
      icon={UsersIcon}
    />
  );
}

// Componente para el contador de suscriptores
interface SubscriberCountProps {
  isPending: boolean;
  isError: boolean;
  data: SubscriberResponse | undefined;
}

function SubscriberCount({ isPending, isError, data }: SubscriberCountProps) {
  return (
    <AsyncBoundary
      isLoading={isPending}
      isError={isError}
      data={data}
      LoadingComponent={<span>cargando...</span>}
      ErrorComponent={<span>error al cargar los suscriptores.</span>}
      EmptyComponent={<span>0 suscriptores.</span>}
    >
      {(subscriberData) => (
        <span>{subscriberData.count || 0} suscriptores.</span>
      )}
    </AsyncBoundary>
  );
}

// Componente para el formulario de newsletter
interface NewsletterFormProps {
  onSubmit: (data: SendNewsletterData) => void;
  register: UseFormReturn<SendNewsletterData>["register"];
  handleSubmit: UseFormReturn<SendNewsletterData>["handleSubmit"];
  errors: UseFormReturn<SendNewsletterData>["formState"]["errors"];
  isPending: boolean;
  subscriberData: SubscriberResponse | undefined;
  isPendingSubscribers: boolean;
  isError: boolean;
}

function NewsletterForm({
  onSubmit,
  register,
  handleSubmit,
  errors,
  isPending,
  subscriberData,
  isPendingSubscribers,
  isError,
}: NewsletterFormProps) {
  return (
    <div className="col-span-1 lg:col-span-1">
      <div className="text-sm text-stone-600 mb-4">
        <span>
          Completa los campos para enviar el newsletter, con esto se enviara un
          correo electrónico a todos los suscriptores, tienes un total de{" "}
        </span>
        <SubscriberCount
          isPending={isPendingSubscribers}
          isError={isError}
          data={subscriberData}
        />
      </div>

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
              Contenido
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
  );
}

// Componente para la lista móvil de suscriptores
interface MobileSubscribersListProps {
  isExpanded: boolean;
  onToggle: () => void;
  isPending: boolean;
  isError: boolean;
  data: SubscriberResponse | undefined;
}

function MobileSubscribersList({
  isExpanded,
  onToggle,
  isPending,
  isError,
  data,
}: MobileSubscribersListProps) {
  return (
    <div className="lg:hidden mb-6">
      <div className="border border-stone-200 bg-white">
        <div
          onClick={onToggle}
          className="p-4 cursor-pointer hover:bg-stone-50 transition-colors duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="size-5 text-stone-600" />
              <div>
                <h3 className="font-semibold text-stone-900">
                  Lista de Suscriptores
                </h3>
                <AsyncBoundary
                  isLoading={isPending}
                  isError={isError}
                  data={data}
                  LoadingComponent={
                    <p className="text-sm text-stone-600">Cargando...</p>
                  }
                  ErrorComponent={
                    <p className="text-sm text-stone-600">
                      Error al cargar los suscriptores
                    </p>
                  }
                  EmptyComponent={
                    <p className="text-sm text-stone-600">
                      No hay suscriptores registrados
                    </p>
                  }
                >
                  {(subscriberData) => (
                    <p className="text-sm text-stone-600">
                      {subscriberData.count || 0} usuarios suscritos
                    </p>
                  )}
                </AsyncBoundary>
              </div>
            </div>
            <ChevronDown
              className={`size-5 text-stone-400 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
        {isExpanded && (
          <div className="border-t border-stone-200 p-4">
            <div className="bg-stone-50 overflow-hidden border border-stone-200">
              <div className="max-h-[400px] overflow-y-auto">
                <AsyncBoundary
                  isLoading={isPending}
                  isError={isError}
                  data={data}
                  LoadingComponent={<LoadingState />}
                  ErrorComponent={<ErrorState />}
                >
                  {(subscriberData) => (
                    <SubscribersTable
                      subscribers={subscriberData.subscribers || []}
                    />
                  )}
                </AsyncBoundary>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Componente para la lista de escritorio de suscriptores
interface DesktopSubscribersListProps {
  isPending: boolean;
  isError: boolean;
  data: SubscriberResponse | undefined;
}

function DesktopSubscribersList({
  isPending,
  isError,
  data,
}: DesktopSubscribersListProps) {
  return (
    <div className="hidden lg:block lg:col-span-1">
      <AsyncBoundary
        isLoading={isPending}
        isError={isError}
        data={data}
        LoadingComponent={
          <div className="bg-stone-50 overflow-hidden animate-pulse max-h-[675px] h-full"></div>
        }
        ErrorComponent={<ErrorState />}
      >
        {(subscriberData) => (
          <div className="bg-stone-50 overflow-hidden h-full">
            <div className="h-[675px] w-full">
              <SubscribersTable
                subscribers={subscriberData.subscribers || []}
              />
            </div>
          </div>
        )}
      </AsyncBoundary>
    </div>
  );
}

// Componente principal
export default function SendNewsletterPage() {
  const { changeTitle } = useTitle();
  const { mutate: sendNewsletter, isPending } = useSendNewsletter();
  const {
    data: subscribers,
    isPending: isPendingSubscribers,
    isError,
  } = useGetSubscribers();
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
      onSuccess: () => {
        toast.success("Newsletter enviado exitosamente", {
          description: `Se envió a ${subscribers?.data?.count} suscriptores`,
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
    changeTitle("Gestor de newsletters - La base");
  }, [changeTitle]);

  const toggleSubscribersExpansion = () => {
    setIsSubscribersExpanded(!isSubscribersExpanded);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between gap-4 mb-8">
        <CustomHeader title="Gestor de Newsletters" />
      </div>

      {subscribers?.data?.total === 0 && <EmptyState />}

      {subscribers?.data?.total !== undefined &&
        subscribers?.data?.total > 0 && (
          <>
            <MobileSubscribersList
              isExpanded={isSubscribersExpanded}
              onToggle={toggleSubscribersExpansion}
              isPending={isPendingSubscribers}
              isError={isError}
              data={subscribers?.data}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <NewsletterForm
                onSubmit={onSubmit}
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                isPending={isPending}
                subscriberData={subscribers?.data}
                isPendingSubscribers={isPendingSubscribers}
                isError={isError}
              />

              <DesktopSubscribersList
                isPending={isPendingSubscribers}
                isError={isError}
                data={subscribers?.data}
              />
            </div>
          </>
        )}
    </div>
  );
}
