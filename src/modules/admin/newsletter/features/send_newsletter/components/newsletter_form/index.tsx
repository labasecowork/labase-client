import type { UseFormReturn } from "node_modules/react-hook-form/dist/types";
import type { SendNewsletterData, SubscriberResponse } from "../../types";
import { Button, Input, Label } from "@/components/ui";
import { Textarea } from "@/components/ui";
import { SubscriberCount } from "..";

interface Props {
  onSubmit: (data: SendNewsletterData) => void;
  register: UseFormReturn<SendNewsletterData>["register"];
  handleSubmit: UseFormReturn<SendNewsletterData>["handleSubmit"];
  errors: UseFormReturn<SendNewsletterData>["formState"]["errors"];
  isPending: boolean;
  subscriberData: SubscriberResponse;
}

export const NewsletterForm: React.FC<Props> = ({
  onSubmit,
  register,
  handleSubmit,
  errors,
  isPending,
  subscriberData,
}) => {
  return (
    <div className="col-span-1 lg:col-span-1">
      <div className="text-sm text-stone-600 mb-4">
        <span>
          Completa los campos para enviar el newsletter, con esto se enviara un
          correo electrónico a todos los suscriptores, tienes un total de{" "}
        </span>
        <SubscriberCount data={subscriberData} />
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
};
