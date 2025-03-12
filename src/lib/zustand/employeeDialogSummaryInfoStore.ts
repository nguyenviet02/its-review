import { JOB_POSITIONS, TSummaryInfoData, TSummaryInfoState } from "@/types";
import { create } from "zustand";

interface IEmployeeDialogSummaryInfoStore {
  dialogState: TSummaryInfoState;
  openDialog: () => void;
  closeDialog: () => void;
  setDialogData: (data: TSummaryInfoData) => void;
}

export const employeeDialogSummaryInfoDefaultState: TSummaryInfoState = {
  isOpen: false,
  data: {
    id: "",
    username: "",
    department: "",
    jobPosition: JOB_POSITIONS.UNSET,
  },
};

export const useEmployeeDialogSummaryInfoStore =
  create<IEmployeeDialogSummaryInfoStore>((set) => ({
    dialogState: employeeDialogSummaryInfoDefaultState,
    openDialog: () =>
      set((store) => ({
        ...store,
        dialogState: { ...store.dialogState, isOpen: true },
      })),
    closeDialog: () =>
      set((store) => ({
        ...store,
        dialogState: employeeDialogSummaryInfoDefaultState,
      })),
    setDialogData: (data: TSummaryInfoData) =>
      set((store) => ({
        ...store,
        dialogState: { ...store.dialogState, data },
      })),
  }));
