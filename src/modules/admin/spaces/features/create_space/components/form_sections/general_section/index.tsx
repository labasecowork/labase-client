import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { createSpaceSchema } from "../../../schemas";
import type { CreateSpaceData, CreateSpaceResponse } from "../../../types";
import { useCreateSpace } from "../../../service";
import { ROUTES } from "@/routes/routes";
import { GeneralInfoSection } from "../info_section";
import { ConfigSection } from "../config_section";
import { PricingSection } from "../pricing_section";

export const Form = () => {
  const navigate = useNavigate();
  const { mutate: createSpace, isPending } = useCreateSpace();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateSpaceData>({
    resolver: zodResolver(createSpaceSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "FULL_ROOM",
      access: "PUBLIC",
      capacityMin: 1,
      capacityMax: 10,
      allowByUnit: true,
      allowFullRoom: false,
      prices: [{ duration: "HOUR", amount: 0, mode: "INDIVIDUAL" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

  const onSubmit = (data: CreateSpaceData) => {
    const payload = {
      name: data.name,
      description: data.description,
      type: data.type,
      access: data.access,
      capacityMin: data.capacityMin,
      capacityMax: data.capacityMax,
      allowByUnit: data.allowByUnit,
      allowFullRoom: data.allowFullRoom,
      prices: data.prices.map((p) => ({
        unit: p.duration,
        value: Number(p.amount),
        mode: p.mode,
      })),
    };

    createSpace(payload, {
      onSuccess: (response: CreateSpaceResponse) => {
        toast.success("Espacio creado exitosamente", {
          description: `El espacio "${response.space.name}" ha sido creado.`,
        });
        navigate(ROUTES.Admin.ViewSpaces);
      },
      onError: (error: Error) => {
        toast.error("Error al crear el espacio", {
          description: error.message,
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
      <GeneralInfoSection register={register} errors={errors} />
      <ConfigSection register={register} errors={errors} />
      <PricingSection
        register={register}
        control={control}
        errors={errors}
        fields={fields}
        append={append}
        remove={remove}
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={isPending} size="lg">
          {isPending ? "Creando Espacio..." : "Crear Espacio"}
        </Button>
      </div>
    </form>
  );
};
