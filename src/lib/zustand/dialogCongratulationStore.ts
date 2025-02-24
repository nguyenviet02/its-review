import { create } from "zustand";

interface IDialogCongratulationStore {
  isOpen: boolean;
  title: string;
  content: string;
  openDialog: () => void;
  closeDialog: () => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
}

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
