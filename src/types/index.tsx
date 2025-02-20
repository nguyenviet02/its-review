export enum ROLES {
  SUPER_ADMIN = "super-admin",
  ADMIN = "admin",
  STAFF = "staff",
  MANAGEMENT = "management",
}

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
