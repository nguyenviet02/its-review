import { INotificationResponseAPI } from "@/types";
import axiosInstance from "./axiosInstance";

/**
 * Get notifications for the current user
 * @returns Promise with array of notifications
 */
export const getNotification = async (): Promise<INotificationResponseAPI[]> => {
  await axiosInstance
    .get<INotificationResponseAPI[]>(`/api/v1/notifications`)
    .then(function (response) {
      return response?.data;
    })
    .catch(function (error) {
      console.log(error.toJSON());
    });
  return [];
};
