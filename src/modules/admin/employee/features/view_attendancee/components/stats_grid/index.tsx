import { UsersIcon, ClockIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import { StatsCard } from "..";
import {
  calculateGrandTotalHours,
  type transformAttendanceData,
} from "../../utils";

interface Props {
  data: ReturnType<typeof transformAttendanceData>;
}
export const StatsGrid: React.FC<Props> = ({ data }) => (
  <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
    <StatsCard
      title="Días registrados"
      value={data.length}
      icon={ClockIcon}
      bgColor="bg-red-800/10"
      iconColor="text-red-800"
      textColor="text-red-800"
    />
    <StatsCard
      title="Total registros"
      value={data.reduce((total, emp) => total + emp.records.length, 0)}
      icon={ChartBarIcon}
      bgColor="bg-orange-800/10"
      iconColor="text-orange-800"
      textColor="text-orange-800"
    />
    <StatsCard
      title="Total horas"
      value={calculateGrandTotalHours(data)}
      icon={ClockIcon}
      bgColor="bg-amber-800/10"
      iconColor="text-amber-800"
      textColor="text-amber-800"
    />
    <StatsCard
      title="Total empleados"
      value={new Set(data.map((e) => e.employeeName)).size}
      icon={UsersIcon}
      bgColor="bg-yellow-800/10"
      iconColor="text-yellow-800"
      textColor="text-yellow-800"
    />
  </div>
);
