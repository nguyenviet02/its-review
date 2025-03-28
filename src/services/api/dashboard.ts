import { IDashboardData } from '@/types';
import axiosInstance from './axiosInstance';

export const getDataDashboard = async (assessmentPeriodId: number) => {
  const { data } = await axiosInstance.get<IDashboardData>(
    `/api/v1/dashboards/annual-reviews/${assessmentPeriodId}`
  );
  return data;
};
