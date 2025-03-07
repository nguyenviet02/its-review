import { create } from "zustand";

interface IEmployeeDialogCreateAssessmentPeriodStore {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useCreateAssessmentPeriodDialogStore =
  create<IEmployeeDialogCreateAssessmentPeriodStore>((set) => ({
    isOpen: false,
    openDialog: () => set({ isOpen: true }),
    closeDialog: () => set({ isOpen: false }),
  }));
