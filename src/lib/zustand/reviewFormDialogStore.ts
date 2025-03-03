import { FORM_TYPES } from "@/types";
import { create } from "zustand";

interface IStaffDialogReviewFormStore {
  isOpen: boolean;
  type: FORM_TYPES;
  openDialog: () => void;
  closeDialog: () => void;
  setType: (type: FORM_TYPES) => void;
}

export const useReviewFormDialogStore = create<IStaffDialogReviewFormStore>(
  (set) => ({
    isOpen: false,
    type: FORM_TYPES.UNSET,
    openDialog: () => set({ isOpen: true }),
    closeDialog: () => set({ isOpen: false }),
    setType: (type: FORM_TYPES) => set({ type }),
  }),
);
