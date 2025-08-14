import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { editSpaceSchema } from "../../../schemas";
import { useUpdateSpace } from "../../../service";
import { ROUTES } from "@/routes/routes";
import { useEffect } from "react";
import type { FormProps, EditSpaceData } from "../../../types";
import { GeneralInfoSection } from "../info_section";
import { ConfigSection } from "../config_section";
import { PricingSection } from "../pricing_section";
// import { ImageSection } from "../../image_section";

export const Form: React.FC<FormProps> = ({ spaceId, defaultValues }) => {
  const navigate = useNavigate();
  const { mutate: updateSpace, isPending } = useUpdateSpace();
  //  const [images, setImages] = useState<File[]>([]);
  // const [existingImages, setExistingImages] = useState<string[]>([]);
  // const [imageError, setImageError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditSpaceData>({
    resolver: zodResolver(editSpaceSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  /*  useEffect(() => {
    if (defaultValues.images && defaultValues.images.length > 0) {
      const imagesToLoad = defaultValues.images.slice(0, 5);
      setExistingImages(imagesToLoad);

      if (defaultValues.images.length > 5) {
        setImageError(
          "Se muestran solo las primeras 5 imágenes debido al límite máximo."
        );
      }
    }
  }, [defaultValues.images]); */

  /* const handleImagesChange = (newImages: File[]) => {
    const totalImages = newImages.length + existingImages.length;
    if (totalImages > 5) {
      setImageError("No puedes tener más de 5 imágenes en total.");
      return;
    }
    setImageError(null);
    setImages(newImages);
  };

  /* const handleRemoveExistingImage = (index: number) => {
    const newExistingImages = existingImages.filter((_, i) => i !== index);
    setExistingImages(newExistingImages);
    setImageError(null);
  }; */

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

  const onSubmit = (data: EditSpaceData) => {
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
        id: p.id,
        duration: p.duration,
        amount: Number(p.amount),
        mode: p.mode,
      })),
    };

    updateSpace(
      // @ts-expect-error TODO: fix this
      { id: spaceId, payload },
      {
        onSuccess: (response) => {
          toast.success("Espacio actualizado exitosamente", {
            description: `El espacio "${response.space.name}" ha sido guardado.`,
          });
          navigate(ROUTES.Admin.ViewSpaces);
        },
        onError: (error: Error) => {
          toast.error("Error al actualizar el espacio", {
            description: error.message,
          });
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
      {/* <ImageSection
        images={images}
        existingImages={existingImages}
        onImagesChange={handleImagesChange}
        onRemoveExistingImage={handleRemoveExistingImage}
        error={imageError}
      /> */}

      <GeneralInfoSection
        register={register}
        control={control}
        errors={errors}
      />

      <ConfigSection register={register} control={control} errors={errors} />

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
          {isPending ? "Guardando cambios..." : "Guardar cambios"}
        </Button>
      </div>
    </form>
  );
};
