import { Dayjs } from "dayjs";

export enum ROLES {
  SUPER_ADMIN = "super-admin",
  ADMIN = "admin",
  STAFF = "staff",
  MANAGEMENT = "management",
}

export enum FORM_FIELDS {
  INPUT = "input",
  MULTI_INPUT = "multi-input",
  TEXTAREA = "textarea",
  SELECT = "select",
  SCORE_INPUT = "score-input",
  TABLE = "table",
}

export enum JOB_POSITIONS {
	UNSET = "Unset",
  DEV = "Developer",
}

export enum FORM_TYPES {
  UNSET = "unset",
  GENERAL = "general",
  FOR_BA = "for-ba",
  FOR_DEV_V1 = "self_review_dev_v1",
  FOR_DEV_MANAGER_V1 = "manager_review_dev_v1",
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
}

export type TFormReview = IField[];

export type TSummaryInfoData = {
  id: string;
  username: string;
  department: string;
  jobPosition: JOB_POSITIONS;
  firstReviewer: string;
  secondReviewer?: string;
};
export type TSummaryInfoState = {
  isOpen: boolean;
  data: TSummaryInfoData;
};

export interface IStaff {
  id: string;
  username: string;
  department: string;
  jobPosition: JOB_POSITIONS;
  email: string;
  organizationId?: number;
}

export interface IAssessmentMinifyData {
  id: string;
  username: string;
  department: string;
  jobPosition: JOB_POSITIONS;
  currentStatus: string;
  period: string;
  deadline: string;
}

export interface IAssessmentPeriod {
  organizationId: number;
  title: string;
  start: Date | null;
  end: Date | null;
}

export interface IAssessmentPeriodImportData {
  employeeId: string;
  reviewerNames: string[];
}
