import type { Article } from "../types";

export const mockArticles: Article[] = [
  {
    id: "art-001",
    title: "5 Consejos para Maximizar tu Productividad en un Coworking",
    author: "Ana García",
    content:
      "El contenido detallado del primer artículo sobre productividad...",
    status: "published",
    publicationDate: "2025-08-15T10:00:00Z",
  },
  {
    id: "art-002",
    title: "Networking Efectivo: Cómo Conectar con Otros Profesionales",
    author: "Carlos Mendoza",
    content: "El contenido detallado del segundo artículo sobre networking...",
    status: "published",
    publicationDate: "2025-08-10T14:30:00Z",
  },
  {
    id: "art-003",
    title: "Próximo Evento de la Comunidad: Taller de Diseño UX/UI",
    author: "Admin La Base",
    content:
      "El contenido detallado del tercer artículo sobre el próximo taller...",
    status: "draft",
    publicationDate: "2025-08-20T09:00:00Z",
  },
  {
    id: "art-004",
    title: "Nuevas Mejoras en Nuestras Instalaciones",
    author: "Ana García",
    content: "El contenido detallado del cuarto artículo sobre las mejoras...",
    status: "published",
    publicationDate: "2025-07-30T11:00:00Z",
  },
];
