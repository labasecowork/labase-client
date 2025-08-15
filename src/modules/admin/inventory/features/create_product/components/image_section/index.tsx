import { Label } from "@/components/ui";
import { UploadCloud } from "lucide-react";

interface ImageSectionProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  error?: string | null;
}

export const ImageSection = ({
  images,
  onImagesChange,
  error,
}: ImageSectionProps) => {
  const handleRemoveImage = (indexToRemove: number) => {
    onImagesChange(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <Label>Images</Label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-stone-300 px-6 py-10">
        <div className="text-center">
          <UploadCloud className="mx-auto h-12 w-12 text-stone-400" />
          <p className="mt-4 text-sm text-stone-600">
            <span className="font-semibold text-stone-800">
              Click to upload
            </span>{" "}
            or drag and drop
          </p>
          <p className="text-xs text-stone-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </div>
  );
};
