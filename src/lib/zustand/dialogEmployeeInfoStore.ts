import { IEmployee, JOB_POSITIONS } from "@/types";
import { create } from "zustand";

interface IDialogEmployeeInfoStore {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  employeeInfo: IEmployee;
  setEmployeeInfo: (employeeInfo: IEmployee) => void;
  resetEmployeeInfo: () => void;
}

const dialogDefaultData: IEmployee = {
  id: "",
  username: "",
  department: "",
  jobPosition: JOB_POSITIONS.UNSET,
  email: "",
  organizationId: 1,
};

export const useDialogEmployeeInfoStore = create<IDialogEmployeeInfoStore>((set) => ({
  isOpen: false,
  employeeInfo: dialogDefaultData,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
  setEmployeeInfo: (employeeInfo: IEmployee) => set({ employeeInfo }),
  resetEmployeeInfo: () => set({ employeeInfo: dialogDefaultData }),
}));
