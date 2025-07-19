import { Link } from "react-router-dom";
import { ListCard } from "../components";
import { ROUTES } from "@/routes/routes";
import { CustomHeader } from "@/components/ui";
import { PlusIcon } from "lucide-react";
import { useTitle } from "@/hooks";
import { useEffect } from "react";

export default function ViewReservationsPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Mis reservas - La base");
  }, [changeTitle]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between gap-4 mb-8">
        <CustomHeader title={"Mis reservas"} />
        <Link
          to={ROUTES.Client.CreateReservation}
          className="bg-stone-500 text-white font-medium hover:bg-stone-400 transition-all text-sm px-8 py-3 rounded-full flex items-center gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          Crear reserva
        </Link>
      </div>

      <ListCard />
    </div>
  );
}
