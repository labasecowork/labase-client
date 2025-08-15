import type { Product } from "../types";

export const mockProducts: Product[] = [
  {
    id: "1",
    imageUrl: "https://i.imgur.com/3723a3N.png", // Imagen de zapatilla azul
    name: "Adidas ORKETRO Shoes Blue",
    variants: 6,
    category: "Man Shoes",
    stock: 10,
    status: "low stock",
    retailPrice: [180.0, 220.0],
    wholesalePrice: [100.0, 170.0],
  },
  {
    id: "2",
    imageUrl: "https://i.imgur.com/5E3z92Y.png", // Imagen de zapatilla verde claro
    name: "Adidas NEO Light Green",
    variants: 1,
    category: "Man Shoes",
    stock: 12,
    status: "low stock",
    retailPrice: 280.0,
    wholesalePrice: 300.0,
  },
  {
    id: "3",
    imageUrl: "https://i.imgur.com/2v3pWFA.png", // Imagen de zapatilla Samba
    name: "Adidas SAMBA Salsa",
    variants: 1,
    category: "Serialized Product",
    stock: 120,
    status: "in stock",
    retailPrice: 250.0,
    wholesalePrice: 280.0,
  },
  {
    id: "4",
    imageUrl: "https://i.imgur.com/f0213qC.png", // Imagen de Ultraboost
    name: "Adidas ULTRABOOST 1.0 DNA",
    variants: 8,
    category: "Man Shoes",
    stock: 120,
    status: "in stock",
    retailPrice: [180.0, 220.0],
    wholesalePrice: [100.0, 170.0],
  },
  {
    id: "5",
    imageUrl: "https://i.imgur.com/PDRrAzX.png", // Imagen de casaca rosa
    name: "Adidas ADICOLOR SST TRACK JACKET",
    variants: 2,
    category: "Man Shoes",
    stock: 120,
    status: "in stock",
    retailPrice: [180.0, 220.0],
    wholesalePrice: [100.0, 170.0],
  },
  {
    id: "6",
    imageUrl: "https://i.imgur.com/k9j7kLg.png", // Imagen de polera roja
    name: "Adidas LOGO FULL-ZIP HOODIE",
    variants: 1,
    category: "Woman Clothes",
    stock: 0,
    status: "out of stock",
    retailPrice: 180.0,
    wholesalePrice: 200.0,
  },
];
