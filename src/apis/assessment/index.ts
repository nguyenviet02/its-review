import axiosInstance from "@/lib/axios/axiosInstance";
import { IAssessmentPeriod, IAssessmentPeriodImportData } from "@/types";

export const createAssessmentPeriod = async (payload: IAssessmentPeriod) => {
  const res = await axiosInstance.post(`/api/v1/annual-review`, payload);
  return res;
};

export const importAssessmentPeriodData = async (
  id: number,
  data: IAssessmentPeriodImportData,
) => {
  const res = await axiosInstance.post(
    `/api/v1/annual-review/${id}/review-assignment`,
    data,
  );
  return res;
};
