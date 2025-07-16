import { formatDate } from "@/utilities";
import { Calendar } from "../components";
import { useEffect } from "react";
import { useTitle } from "@/hooks";
import { CustomHeader } from "@/components/ui";

export default function ViewCalendarPage() {
  const currentDate = new Date();
  const { changeTitle } = useTitle();
  useEffect(() => {
    changeTitle("Calendario - La base");
  }, []);
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <CustomHeader title={`Calendario - ${formatDate(currentDate)}`} />
      <div className="w-full mt-8 h-[calc(100vh-14rem)] bg-stone-50">
        <Calendar />
      </div>
    </div>
  );
}
