import { Table, TableBody } from "@/components/ui";
import { TableHeaders } from "../";
import { AttendanceRow } from "../";
import { transformAttendanceData } from "../../utils";

interface Props {
  data: ReturnType<typeof transformAttendanceData>;
}

export const EmployeeTable: React.FC<Props> = ({ data }) => (
  <div className="bg-stone-50 overflow-hidden">
    <Table>
      <TableHeaders />
      <TableBody>
        {data.map((dayRecord) => (
          <>
            {dayRecord.records.map((record, recordIndex) => (
              <AttendanceRow
                key={record.id}
                dayRecord={dayRecord}
                record={record}
                recordIndex={recordIndex}
              />
            ))}
          </>
        ))}
      </TableBody>
    </Table>
  </div>
);
