import { INotificationResponseAPI } from '@/types';
import { create } from 'zustand';

interface INotificationPopupStore {
  isOpen: boolean;
  notifications: INotificationResponseAPI[];
  openPopup: () => void;
  closePopup: () => void;
  setNotifications: (notifications: INotificationResponseAPI[]) => void;
}

export const useNotificationPopupStore = create<INotificationPopupStore>(
  (set) => ({
    isOpen: false,
    notifications: [],
    openPopup: () => set({ isOpen: true }),
    closePopup: () => set({ isOpen: false }),
    setNotifications: (notifications: INotificationResponseAPI[]) =>
      set({ notifications }),
  })
);
