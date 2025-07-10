import { Link } from "react-router-dom";
import { ListCard } from "../components";
import { ROUTES } from "@/routes/routes";

export default function ViewReservationsPage() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-stone-900">Mis reservas</h2>
        <Link
          to={ROUTES.Client.CreateReservation}
          className="bg-stone-500 text-white font-medium hover:bg-stone-400 transition-all text-sm px-8 py-3 rounded-full"
        >
          Crear reserva
        </Link>
      </div>
      <ListCard />
    </div>
  );
}
