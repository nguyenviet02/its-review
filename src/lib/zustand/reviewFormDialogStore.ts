import { FORM_TYPES } from "@/types";
import { create } from "zustand";

interface IStaffDialogSummaryInfoStore {
  isOpen: boolean;
  type: FORM_TYPES;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useReviewFormDialogStore = create<IStaffDialogSummaryInfoStore>(
  (set) => ({
    isOpen: false,
    type: FORM_TYPES.GENERAL,
    openDialog: () => set({ isOpen: true }),
    closeDialog: () => set({ isOpen: false }),
  }),
);
