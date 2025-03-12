import axiosInstance from "@/lib/axios/axiosInstance";

export const getNotification = async () => {
  const { data } = await axiosInstance.get(`/api/v1/notifications`);
  return data;
};
