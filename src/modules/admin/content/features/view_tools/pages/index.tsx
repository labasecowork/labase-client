import { CustomHeader } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { MailIcon, NewspaperIcon } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
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
];

export default function ViewToolsPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-8">
      <CustomHeader title="Herramientas" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {actions.map((action) => (
          <Link
            to={action.to}
            className="rounded-none w-full bg-orange-700/10 p-6 flex items-start justify-center text-sm text-orange-900 gap-2 hover:bg-orange-700/20 transition-all duration-300 cursor-pointer"
          >
            <div className="p-2 bg-orange-500/10">
              <action.icon className="h-4 w-4" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-left w-full">
                {action.title}
              </p>
              <p className="text-xs text-orange-800 text-left w-full">
                {action.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
