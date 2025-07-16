import { Calendar } from "../components";

export default function ViewCalendarPage() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-stone-900">
          Calendario de reservas
        </h2>
      </div>
      <Calendar />
    </div>
  );
}
