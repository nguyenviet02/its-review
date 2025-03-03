import { TSummaryInfoData, TSummaryInfoState } from "@/types";
import { create } from "zustand";

interface IStaffDialogSummaryInfoStore {
  dialogState: TSummaryInfoState;
  openDialog: () => void;
  closeDialog: () => void;
  setDialogData: (data: TSummaryInfoData) => void;
}

export const staffDialogSummaryInfoDefaultState: TSummaryInfoState = {
  isOpen: false,
  data: {
    id: "",
    username: "",
    department: "",
    jobPosition: "",
    firstReviewer: "",
    secondReviewer: "",
    assessmentPeriodId: null,
    __type: "",
  },
};

export const useStaffDialogSummaryInfoStore =
  create<IStaffDialogSummaryInfoStore>((set) => ({
    dialogState: staffDialogSummaryInfoDefaultState,
    openDialog: () =>
      set((store) => ({
        ...store,
        dialogState: { ...store.dialogState, isOpen: true },
      })),
    closeDialog: () =>
      set((store) => ({
        ...store,
        dialogState: staffDialogSummaryInfoDefaultState,
      })),
    setDialogData: (data: TSummaryInfoData) =>
      set((store) => ({
        ...store,
        dialogState: { ...store.dialogState, data },
      })),
  }));
