import axiosInstance from "@/lib/axios/axiosInstance";
import { IAssessmentPeriod, IAssessmentPeriodImportData } from "@/types";

// POST
export const createAssessmentPeriod = async (payload: IAssessmentPeriod) => {
  const res = await axiosInstance.post(
    `/api/v1/organizations/annual-reviews`,
    payload,
  );
  return res;
};

export const importAssessmentPeriodData = async (
  id: number,
  data: IAssessmentPeriodImportData,
) => {
  const res = await axiosInstance.post(
    `/api/v1/annual-reviews/${id}/review-assignment`,
    data,
  );
  return res;
};

// GET
export const getListAssessmentPeriod = async (
  limit: number,
  page: number,
  order: string = "ASC",
) => {
  const res = await axiosInstance.get(`/api/v1/organizations/annual-reviews`, {
    params: {
      limit: limit,
      page: page + 1, // DataGrid page start from 0
      order: order,
    },
  });
  return res;
};
