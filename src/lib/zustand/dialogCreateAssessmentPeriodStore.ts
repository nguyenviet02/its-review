import { FORM_TYPES } from "@/types";
import { create } from "zustand";

interface IStaffDialogCreateAssessmentPeriodStore {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useCreateAssessmentPeriodDialogStore =
  create<IStaffDialogCreateAssessmentPeriodStore>((set) => ({
    isOpen: false,
    openDialog: () => set({ isOpen: true }),
    closeDialog: () => set({ isOpen: false }),
  }));
