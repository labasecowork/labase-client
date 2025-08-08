import { z } from "zod";
import { editEmployeeSchema } from "../schema";

export type EditEmployeeForm = z.infer<typeof editEmployeeSchema>;

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
