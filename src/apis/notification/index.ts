import axiosInstance from "@/lib/axios/axiosInstance";
import { INotificationResponseAPI } from "@/types";

export const getNotification = async () => {
  const { data } = await axiosInstance.get<INotificationResponseAPI[]>(
    `/api/v1/notifications`,
  );
  return data;
};
