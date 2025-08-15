export type ProductStatus = "in stock" | "low stock" | "out of stock";

export interface Product {
  id: string;
  imageUrl: string;
  name: string;
  variants: number;
  category: string;
  stock: number;
  status: ProductStatus;
  retailPrice: number | [number, number];
  wholesalePrice: number | [number, number];
}
