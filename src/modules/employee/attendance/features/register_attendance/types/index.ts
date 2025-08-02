export interface Attendance {
  id: string;
  type: string;
  date: string;
  check_time: string;
}

export interface AttendanceResponse {
  attendances: Attendance[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface RegisterAttendanceResponse {
  message: string;
  attendance_id: string;
  type: "EXIT" | "ENTRY";
  date: string;
  check_time: string;
  user: {
    id: string;
    user_type: "employee" | "admin";
    status: "active" | "inactive";
    adminDetails: null;
  };
}
