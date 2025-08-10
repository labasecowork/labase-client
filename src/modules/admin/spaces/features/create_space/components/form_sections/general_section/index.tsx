import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { ImageSection } from "../image_section";
import { createSpaceSchema } from "../../../schemas";
import type { CreateSpaceData, CreateSpaceResponse } from "../../../types";
import { useCreateSpace } from "../../../service";
import { ROUTES } from "@/routes/routes";
import { GeneralInfoSection } from "../info_section";
import { ConfigSection } from "../config_section";
import { PricingSection } from "../pricing_section";
import { useState } from "react";

export const Form = () => {
  const navigate = useNavigate();
  const { mutate: createSpace, isPending } = useCreateSpace();
  const [images, setImages] = useState<File[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
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
    if (images.length === 0) {
      setImageError("Debes agregar al menos 1 imagen del espacio");
      return;
    }

    setImageError(null);

    const formData = new FormData();

    const jsonData = {
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

    Object.entries(jsonData).forEach(([key, value]) => {
      if (key === "prices") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    images.forEach((image) => {
      formData.append("images[]", image);
    });

    createSpace(formData, {
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
      <ImageSection
        images={images}
        onImagesChange={setImages}
        error={imageError}
      />
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
        <Button
          type="submit"
          disabled={isPending}
          className="w-full md:w-auto rounded-full px-8 py-3.5"
        >
          {isPending ? "Creando espacio..." : "Crear espacio"}
        </Button>
      </div>
    </form>
  );
};
