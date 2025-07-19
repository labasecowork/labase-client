import type { User } from "@/types/user";
import type { UserNavigationItem } from "../types";

export const mockUser: User = {
  id: "1",
  name: "María González",
  email: "maria@labase.com",
  userType: "client", // Cambiar a "client" para probar vista de cliente
};

export const userNavigation: UserNavigationItem[] = [
  { name: "Tu perfil", href: "#" },
  { name: "Configuración", href: "#" },
];
