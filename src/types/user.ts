export interface IEmployee {
  id: string;
  username: string;
  department: string;
  jobPosition: string;
  email: string;
  organizationId?: number;
  block: string;
  team?: string;
}

export interface IEmployeeResponseAPI extends IEmployee {
  createdAt: string;
  updatedAt: string;
}
