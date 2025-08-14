import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  FileDropZone,
  Image,
} from "@/components/ui";
import { XIcon } from "lucide-react";

interface ImageSectionProps {
  images: File[];
  existingImages?: string[]; // URLs de imágenes existentes
  onImagesChange: (images: File[]) => void;
  onRemoveExistingImage?: (index: number) => void;
  error?: string | null;
}

export const ImageSection = ({
  images,
  existingImages = [],
  onImagesChange,
  onRemoveExistingImage,
  error,
}: ImageSectionProps) => {
  const totalImages = images.length + existingImages.length;
  const hasTooManyImages = totalImages > 5;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Imagenes del espacio</CardTitle>
        <CardDescription>
          Agrega imagenes del espacio para que los usuarios puedan verlo. Máximo
          5 imágenes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div>
            <FileDropZone
              onFilesChange={(newFiles) => {
                const totalFilesAfterAdd = totalImages + newFiles.length;
                if (totalFilesAfterAdd > 5) {
                  // Solo permitir los archivos que no excedan el límite
                  const allowedFiles = newFiles.slice(0, 5 - totalImages);
                  onImagesChange([...images, ...allowedFiles]);
                } else {
                  onImagesChange([...images, ...newFiles]);
                }
              }}
              files={images}
              acceptedTypes={["image/*"]}
              maxFiles={5 - existingImages.length} // Ajustar según imágenes existentes
              maxFileSize={10 * 1024 * 1024}
              multiple={true}
            />
          </div>
          {error && (
            <div className="mt-2 p-2 bg-rose-50 border border-rose-200 rounded-md">
              <p className="text-sm text-rose-600">{error}</p>
            </div>
          )}
          {hasTooManyImages && (
            <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-md">
              <p className="text-sm text-amber-600">
                Has alcanzado el límite máximo de 5 imágenes.
              </p>
            </div>
          )}
          {totalImages >= 5 && !hasTooManyImages && (
            <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-md">
              <p className="text-sm text-amber-600">
                Has alcanzado el límite máximo de 5 imágenes.
              </p>
            </div>
          )}

          <div className="mt-2 grid grid-cols-4 gap-2">
            {/* Mostrar imágenes existentes (URLs) */}
            {existingImages.map((imageUrl, index) => (
              <div key={`existing-${index}`} className="relative bg-stone-600">
                <Image
                  src={imageUrl}
                  alt={`Imagen existente ${index + 1}`}
                  className="w-full h-24 rounded-xs overflow-hidden object-cover"
                />
                {onRemoveExistingImage && (
                  <button
                    type="button"
                    onClick={() => onRemoveExistingImage(index)}
                    className="absolute top-1 right-1 bg-white/40 backdrop-blur-sm text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-white/10 transition-all duration-200 cursor-pointer"
                  >
                    <XIcon className="size-3" />
                  </button>
                )}
              </div>
            ))}

            {/* Mostrar nuevas imágenes (Files) */}
            {images.map((image, index) => (
              <div
                key={`new-${image.name}-${index}`}
                className="relative bg-stone-600"
              >
                <Image
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  className="w-full h-24 rounded-xs overflow-hidden object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newImages = images.filter((_, i) => i !== index);
                    onImagesChange(newImages);
                  }}
                  className="absolute top-1 right-1 bg-white/40 backdrop-blur-sm text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-white/10 transition-all duration-200 cursor-pointer"
                >
                  <XIcon className="size-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
