export enum ROLES {
  SUPER_ADMIN = "super-admin",
  ADMIN = "admin",
  STAFF = "employee",
  MANAGEMENT = "management",
}

export enum FORM_FIELDS {
  INPUT = "input",
  MULTI_INPUT = "multi-input",
  MULTI_INPUT_SCORE = "multi-input-score",
  TEXTAREA = "textarea",
  SELECT = "select",
  SCORE_INPUT = "score-input",
  TABLE = "table",
}

export enum FORM_TYPES {
  UNSET = "unset",
  GENERAL = "general",
  FOR_BA = "for-ba",
  FOR_DEV_V1 = "self_review_dev_v1",
  FOR_DEV_MANAGER_V1 = "manager_review_dev_v1",
  FOR_ITS_V1 = "self_review_its_v1",
  FOR_ITS_MANAGER_V1 = "manager_review_its_v1",
  FOR_TESTER = "for-tester",
}

export enum FORM_STATUS {
  WAITING_FILL_FORM = "waitingFillForm",
  WAITING_MANAGER = "waitingManager",
  WAITING_BO = "waitingBO",
}

export interface IScoreScale {
  score: number;
  description: string;
}
export interface ICriterion {
  number: string;
  title: string;
  name: string;
  type: FORM_FIELDS;
  description?: string;
  scoreScale?: IScoreScale[];
}
export interface IField {
  number: string;
  title: string;
  description?: string;
  criterions: ICriterion[];
  isForManager?: boolean;
}

export type TFormReview = IField[];

export type TSummaryInfoData = {
  id: string;
  username: string;
  department: string;
  jobPosition: string;
};
export type TSummaryInfoState = {
  isOpen: boolean;
  data: TSummaryInfoData;
};

export interface IEmployee {
  id: string;
  username: string;
  department: string;
  jobPosition: string;
  email: string;
  organizationId?: number;
}

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

export interface IEmployeeResponseAPI extends IEmployee {
  createdAt: string;
  updatedAt: string;
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
  employee: IEmployeeResponseAPI;
  annualReview: IAnnualReviewResponseAPI;
}

export interface IPlanData {
  id?: string;
  goal: string;
  estimatedTime: Date;
  propose: string;
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
  userCount: number;
  employeeInAnnualReviewCount: number;
  reviewCountByDepartment: IDepartmentReviewCount[];
  reviewStatusRatio: IReviewStatusRatio;
}
