import { ROUTES } from "@/routes/routes";
import { MailIcon, NewspaperIcon, Container } from "lucide-react";

export const actions = [
  {
    title: "Gestionar articulos",
    description: "Con esto podras gestionar los articulos en la página web.",
    icon: NewspaperIcon,
    to: ROUTES.Admin.ViewArticles,
  },
  {
    title: "Newsletter",
    description: "Con esto podras enviar un newsletter a todos los clientes.",
    icon: MailIcon,
    to: ROUTES.Admin.SendNewsletter,
  },
  {
    title: "Gestionar Inventario",
    description: "Con esto podras gestionar los inventarios en la página web.",
    icon: Container,
    to: ROUTES.Admin.ViewInventory,
  },
];
