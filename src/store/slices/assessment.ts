import { FORM_TYPES } from '@/types';
import { create } from 'zustand';

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
  employeeId: string;
  managerId: string;
  openDialog: (
    employeeId: string,
    managerId: string,
    assessmentPeriodId: number | null,
  ) => void;
  closeDialog: () => void;
}

export const useExtendTimeDialogStore = create<ExtendTimeDialogState>(
  (set) => ({
    isOpen: false,
    assessmentPeriodId: null,
    managerId: '',
    employeeId: '',
    openDialog: (
      employeeId: string,
      managerId: string,
      assessmentPeriodId: number | null,
    ) => set({ isOpen: true, employeeId, managerId, assessmentPeriodId }),
    closeDialog: () =>
      set({
        isOpen: false,
        employeeId: '',
        managerId: '',
        assessmentPeriodId: null,
      }),
  }),
);
