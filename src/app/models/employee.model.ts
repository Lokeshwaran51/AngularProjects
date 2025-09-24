export interface Employee {
    id: string;
  name: string;
  email: string;
  mobile: number;
  department: string;
}

export interface EmployeeResponse {
  employees: Employee[];
}