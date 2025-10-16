export interface Employee {
    id?: number;
  name: string;
  email: string;
  mobile: number;
  department: string;
}

export interface EmployeeResponse {
  employees: Employee[];
}