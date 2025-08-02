interface Attendance {
  id: string;
  employee_id: string;
  type: string;
  date: string;
  check_time: string;
  employee: {
    employee_id: string;
    user: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
    };
  };
}

interface AttendanceResponse {
  attendances: Attendance[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type { Attendance, AttendanceResponse };
