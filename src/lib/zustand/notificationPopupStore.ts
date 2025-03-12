import { INotification } from "@/types";
import { create } from "zustand";

interface INotificationPopupStore {
  isOpen: boolean;
  notifications: INotification[];
  openPopup: () => void;
  closePopup: () => void;
  setNotifications: (notifications: INotification[]) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

export const useNotificationPopupStore = create<INotificationPopupStore>((set) => ({
  isOpen: false,
  notifications: [],
  openPopup: () => set({ isOpen: true }),
  closePopup: () => set({ isOpen: false }),
  setNotifications: (notifications: INotification[]) => set({ notifications }),
  markAsRead: (id: string) => 
    set((state) => ({
      notifications: state.notifications.map((notification) => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    })),
  markAllAsRead: () => 
    set((state) => ({
      notifications: state.notifications.map((notification) => 
        ({ ...notification, isRead: true })
      )
    })),
}));
