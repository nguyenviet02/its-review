import axiosInstance from "@/lib/axios/axiosInstance";
import { IDashboardData } from "@/types";

export const getDataDashboard = async (assessmentPeriodId: number) => {
  const { data } = await axiosInstance.get<IDashboardData>(
    `/api/v1/dashboards/annual-reviews/${assessmentPeriodId}`,
  );
  return data;
};
