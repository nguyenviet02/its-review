export enum ROLES {
  SUPER_ADMIN = 'super-admin',
  ADMIN = 'admin',
  STAFF = 'employee',
  MANAGEMENT = 'management',
}

export enum FORM_STATUS {
  WAITING_FILL_FORM = 'waitingFillForm',
  WAITING_MANAGER = 'waitingManager',
  WAITING_BO = 'waitingBO',
}

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
