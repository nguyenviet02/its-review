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
  FOR_BA_V1 = "self_review_ba_v1",
  FOR_BA_MANAGER_V1 = "manager_review_ba_v1",
  FOR_DEV_V1 = "self_review_dev_v1",
  FOR_DEV_MANAGER_V1 = "manager_review_dev_v1",
  FOR_ITS_V1 = "self_review_its_v1",
  FOR_ITS_MANAGER_V1 = "manager_review_its_v1",
  FOR_TESTER_V1 = "self_review_tester_v1",
	FOR_TESTER_MANAGER_V1 = "manager_review_tester_v1",
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
  isRequired?: boolean;
}

export interface IField {
  number: string;
  title: string;
  description?: string;
  criterions: ICriterion[];
  isForManager?: boolean;
}

export type TFormReview = IField[];

export interface IPlanData {
  id?: string;
  goal: string;
  estimatedTime: Date;
  propose: string;
}
