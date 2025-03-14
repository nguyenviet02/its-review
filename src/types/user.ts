import { ROLES } from "./common";

export interface IEmployee {
  id: string;
  username: string;
  department: string;
  jobPosition: string;
  email: string;
  organizationId?: number;
}

export interface IEmployeeResponseAPI extends IEmployee {
  createdAt: string;
  updatedAt: string;
}

export interface IUser extends IEmployee {
  roles: ROLES[];
}

export interface IUserSession {
  id: string;
  username: string;
  email: string;
  roles: ROLES[];
  department?: string;
  jobPosition?: string;
  accessToken?: string;
}
