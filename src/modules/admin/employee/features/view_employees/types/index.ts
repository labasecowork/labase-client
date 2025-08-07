export interface Employee {
  employee_id: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    user_type: string;
    profile_image: string;
    phone: string;
    birth_date: string;
    gender: string;
    status: string;
    creation_timestamp: string;
  };
}

export interface EmployeesResponse {
  employees: Employee[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
