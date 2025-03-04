import { FORM_TYPES } from "@/types";
import { create } from "zustand";

interface IStaffDialogReviewFormStore {
  isOpen: boolean;
  type: FORM_TYPES;
  assessmentPeriodId: number | null;
  userId: string | null;
  isManager: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  setAssessmentPeriodId: (assessmentPeriodId: number) => void;
  setFormType: (type: FORM_TYPES) => void;
  setUserId: (userId: string) => void;
  setIsManager: (isManager: boolean) => void;
}

export const useReviewFormDialogStore = create<IStaffDialogReviewFormStore>(
  (set) => ({
    isOpen: false,
    type: FORM_TYPES.UNSET,
    assessmentPeriodId: null,
    userId: null,
    isManager: false,
    openDialog: () => set({ isOpen: true }),
    closeDialog: () => set({ isOpen: false }),
    setAssessmentPeriodId: (assessmentPeriodId: number) =>
      set({ assessmentPeriodId }),
    setFormType: (type: FORM_TYPES) => set({ type }),
    setUserId: (userId: string) => set({ userId }),
    setIsManager: (isManager: boolean) => set({ isManager }),
  }),
);
