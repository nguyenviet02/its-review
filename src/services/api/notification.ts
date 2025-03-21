import { INotificationResponseAPI } from "@/types";
import axiosInstance from "./axiosInstance";

/**
 * Get notifications for the current user
 * @returns Promise with array of notifications
 */
export const getNotification = async (): Promise<
  INotificationResponseAPI[]
> => {
  const res = await axiosInstance.get<INotificationResponseAPI[]>(
    `/api/v1/notifications`,
  );
  if (res.status === 200) {
    return res.data;
  }
  return [];
};
