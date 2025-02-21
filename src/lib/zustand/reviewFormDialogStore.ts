import { create } from "zustand";

interface IStaffDialogSummaryInfoStore {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useReviewFormDialogStore = create<IStaffDialogSummaryInfoStore>(
  (set) => ({
    isOpen: false,
    openDialog: () => set({ isOpen: true }),
    closeDialog: () => set({ isOpen: false }),
  }),
);
