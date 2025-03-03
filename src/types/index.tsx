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

export enum FORM_TYPES {
  GENERAL = "general",
  FOR_BA = "for-ba",
  FOR_DEV = "for-dev",
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
  scoreScale?: IScoreScale[];
}
export interface Field {
  number: string;
  title: string;
  description?: string;
  criterions: ICriterion[];
}
export interface IPage {
  id: string;
  fields: Field[];
}

export type TFormReview = IPage[];

export type TSummaryInfoData = {
  id: string;
  username: string;
  department: string;
  jobPosition: string;
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
}

export interface IAssessmentPeriodImportData {
  employeeId: string;
  reviewerNames: string[];
}
