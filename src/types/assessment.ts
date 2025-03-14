import { IEmployee } from "./user";

export interface IAssessmentMinifyData {
  id: string;
  username: string;
  department: string;
  jobPosition: string;
  currentStatus: string;
  period: string;
  deadline: string;
}

export interface IAssessmentPeriod {
  organizationId: number;
  title: string;
  start: Date | null;
  end: Date | null;
  selfReviewEnd: Date | null;
  managerReviewEnd: Date | null;
}

export interface IAssessmentPeriodResponseAPI extends IAssessmentPeriod {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface IAssessmentPeriodImportData {
  employeeId: string;
  managerNames: string[];
}

export interface IAnnualReviewResponseAPI {
  id: number;
  title: string;
  start: string;
  selfReviewEnd: string;
  managerReviewEnd: string;
  end: string;
  createdAt: string;
  updatedAt: string;
}

export interface INotificationResponseAPI {
  employee: IEmployee;
  annualReview: IAnnualReviewResponseAPI;
}

export interface IDepartmentReviewCount {
  department: string;
  count: number;
}

export interface IReviewStatusRatio {
  waitingEmployee: number;
  waitingManager: number;
  completed: number;
}

export interface IDashboardData {
	employeeInAnnualReviewCount: number;
	userCount: number;
  reviewCountByDepartment: IDepartmentReviewCount[];
  reviewStatusRatio: IReviewStatusRatio;
}
