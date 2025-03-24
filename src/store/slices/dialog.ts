import { create } from "zustand";
import { IEmployee, TSummaryInfoData, TSummaryInfoState, IAssessmentPeriodResponseAPI } from "@/types";

// Default states
export const employeeDialogSummaryInfoDefaultState: TSummaryInfoState = {
  isOpen: false,
  data: {
    id: "",
    username: "",
    department: "",
    jobPosition: "",
  },
};

// Dialog store interfaces
interface IDialogBase {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

interface IDialogEmployeeInfoStore extends IDialogBase {
  employeeInfo: IEmployee;
  setEmployeeInfo: (employeeInfo: IEmployee) => void;
  resetEmployeeInfo: () => void;
}

interface IDialogCongratulationStore extends IDialogBase {
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
}

interface IEmployeeDialogSummaryInfoStore {
  dialogState: TSummaryInfoState;
  openDialog: () => void;
  closeDialog: () => void;
  setDialogData: (data: TSummaryInfoData) => void;
}

interface IDataAssessmentPeriodDialogStore extends IDialogBase {
  assessmentPeriodId: number | null;
  assessmentPeriodName: string;
  setAssessmentPeriodId: (id: number) => void;
  setAssessmentPeriodName: (name: string) => void;
}

// Combined assessment period dialog store for both create and edit operations
interface IAssessmentPeriodDialogStore extends IDialogBase {
  mode: 'create' | 'edit';
  assessmentPeriod: IAssessmentPeriodResponseAPI | null;
  setMode: (mode: 'create' | 'edit') => void;
  setAssessmentPeriod: (assessmentPeriod: IAssessmentPeriodResponseAPI | null) => void;
  openCreateDialog: () => void;
  openEditDialog: (assessmentPeriod: IAssessmentPeriodResponseAPI) => void;
}

// Default data for employee info dialog
const dialogDefaultData: IEmployee = {
  id: "",
  username: "",
	block: "",
  department: "",
	team: "",
  jobPosition: "",
  email: "",
  organizationId: 1,
};

// Store implementations
export const useDialogEmployeeInfoStore = create<IDialogEmployeeInfoStore>((set) => ({
  isOpen: false,
  employeeInfo: dialogDefaultData,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
  setEmployeeInfo: (employeeInfo: IEmployee) => set({ employeeInfo }),
  resetEmployeeInfo: () => set({ employeeInfo: dialogDefaultData }),
}));

export const useDialogCongratulationStore = create<IDialogCongratulationStore>(
  (set) => ({
    isOpen: false,
    title: "Đánh giá nhân sự",
    content:
      "Cảm ơn bạn đã hoàn thành quá trình tự đánh giá nhân sự Chúc bạn sẽ đạt được kết quả tốt nhất",
    openDialog: () => set({ isOpen: true }),
    closeDialog: () => set({ isOpen: false }),
    setTitle: (title: string) => set({ title }),
    setContent: (content: string) => set({ content }),
  }),
);

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

// Combined store for assessment period create/edit operations
export const useAssessmentPeriodDialogStore =
  create<IAssessmentPeriodDialogStore>((set) => ({
    isOpen: false,
    mode: 'create',
    assessmentPeriod: null,
    openDialog: () => set({ isOpen: true }),
    closeDialog: () => set({ 
      isOpen: false,
      // Reset assessment period data when closing
      assessmentPeriod: null
    }),
    setMode: (mode: 'create' | 'edit') => set({ mode }),
    setAssessmentPeriod: (assessmentPeriod: IAssessmentPeriodResponseAPI | null) => 
      set({ assessmentPeriod }),
    openCreateDialog: () => set({ 
      isOpen: true, 
      mode: 'create',
      assessmentPeriod: null
    }),
    openEditDialog: (assessmentPeriod: IAssessmentPeriodResponseAPI) => set({ 
      isOpen: true, 
      mode: 'edit',
      assessmentPeriod
    }),
  }));
