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
export interface ScoreScale {
  score: number;
  description: string;
}
export interface Criterion {
  number: string;
  title: string;
  type: FORM_FIELDS;
  scoreScale?: ScoreScale[];
}
export interface Field {
  number: string;
  title: string;
  description?: string;
  type?: FORM_FIELDS;
  criterions?: Criterion[];
}
export interface IPage {
  id: string;
  fields: Field[];
}

export type TFormReviewGeneral = IPage[];

export type TSummaryInfoData = {
  id: string;
  name: string;
  department: string;
  position: string;
  firstReviewer: string;
  secondReviewer?: string;
};
export type TSummaryInfoState = {
  isOpen: boolean;
  data: TSummaryInfoData;
};
