import axiosInstance from "@/lib/axios/axiosInstance";
import { IAssessmentPeriod } from "@/types";

export const createAssessmentPeriod = async (payload: IAssessmentPeriod) => {
  const res = await axiosInstance.post(`/api/v1/annual-review`, payload);
  return res;
};
