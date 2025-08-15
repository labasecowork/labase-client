import { useForm } from "react-hook-form";
import {
  Button,
  Input,
  Label,
  Textarea,
  Card,
  CardContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import { useState } from "react";
import { ImageSection } from "../image_section";
import type { ProductFormData } from "../../types";

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void; // Simplificado para maquetado
  isSubmitting: boolean;
}

export const ProductForm = ({ onSubmit, isSubmitting }: ProductFormProps) => {
  const [images, setImages] = useState<File[]>([]);

  const { register, handleSubmit } = useForm<ProductFormData>({
    // Zod resolver se puede añadir aquí más tarde
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
      <Card>
        <CardContent className="p-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="productName">Product name</Label>
              <Input
                id="productName"
                placeholder="e.g. Cheese Burger"
                {...register("productName")}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="productType">Product Type</Label>
                <Select {...register("productType")}>
                  <SelectTrigger id="productType">
                    <SelectValue placeholder="Stocked product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stocked">Stocked product</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="productCategory">Product Category</Label>
                <Select {...register("productCategory")}>
                  <SelectTrigger id="productCategory">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="sku">Product SKU</Label>
                <Input id="sku" placeholder="XXX-XXX-XX" {...register("sku")} />
              </div>
              <div>
                <Label htmlFor="barcode">Barcode</Label>
                <Input
                  id="barcode"
                  placeholder="XX-XXXX"
                  {...register("barcode")}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Product description"
                className="min-h-[120px]"
                {...register("description")}
              />
            </div>

            <ImageSection images={images} onImagesChange={setImages} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4 mt-8">
        <Button
          variant="outline"
          className="bg-stone-100 text-stone-700 hover:bg-stone-200"
        >
          Guardar como Borrador
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-stone-800 text-white hover:bg-stone-700"
        >
          {isSubmitting ? "Creando..." : "Crear"}
        </Button>
      </div>
    </form>
  );
};
