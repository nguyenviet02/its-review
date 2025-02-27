import { IStaff } from "@/types";
import { create } from "zustand";

interface IDialogStaffInfoStore {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  staffInfo: IStaff;
  setStaffInfo: (staffInfo: IStaff) => void;
  resetStaffInfo: () => void;
}

const dialogDefaultData: IStaff = {
  id: "",
  username: "",
  department: "",
  jobPosition: "",
  email: "",
  organizationId: 1,
};

export const useDialogStaffInfoStore = create<IDialogStaffInfoStore>((set) => ({
  isOpen: false,
  staffInfo: dialogDefaultData,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
  setStaffInfo: (staffInfo: IStaff) => set({ staffInfo }),
  resetStaffInfo: () => set({ staffInfo: dialogDefaultData }),
}));
