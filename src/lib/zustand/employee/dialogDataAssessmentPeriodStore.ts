import { create } from "zustand";

interface IDataAssessmentPeriodDialogStore {
  isOpen: boolean;
  assessmentPeriodId: number | null;
  assessmentPeriodName: string;
  openDialog: () => void;
  closeDialog: () => void;
  setAssessmentPeriodId: (id: number) => void;
  setAssessmentPeriodName: (name: string) => void;
}

export const useDataAssessmentPeriodDialogStore =
  create<IDataAssessmentPeriodDialogStore>((set) => ({
    isOpen: false,
    assessmentPeriodId: null,
    assessmentPeriodName: "",
    openDialog: () => set({ isOpen: true }),
    closeDialog: () => set({ isOpen: false }),
    setAssessmentPeriodId: (id: number) => set({ assessmentPeriodId: id }),
    setAssessmentPeriodName: (name: string) =>
      set({ assessmentPeriodName: name }),
  }));
