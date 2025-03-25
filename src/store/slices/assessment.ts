import { FORM_TYPES } from "@/types";
import { create } from "zustand";

interface IReviewFormDialogStore {
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

export const useReviewFormDialogStore = create<IReviewFormDialogStore>(
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

interface ExtendTimeDialogState {
  isOpen: boolean;
  assessmentPeriodId: number | null;
  userId: string;
  userType: "employee" | "manager";
  openDialog: (
    userId: string,
    type: "employee" | "manager",
    assessmentPeriodId: number | null,
  ) => void;
  closeDialog: () => void;
}

export const useExtendTimeDialogStore = create<ExtendTimeDialogState>(
  (set) => ({
    isOpen: false,
    assessmentPeriodId: null,
    userType: "employee",
    userId: "",
    openDialog: (
      userId: string,
      userType: "employee" | "manager",
      assessmentPeriodId: number | null,
    ) => set({ isOpen: true, userId, userType, assessmentPeriodId }),
    closeDialog: () =>
      set({
        isOpen: false,
        userId: "",
        userType: "employee",
        assessmentPeriodId: null,
      }),
  }),
);
