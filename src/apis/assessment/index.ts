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

export const getListStaffOfAssessmentPeriod = async (
  id: number,
  limit: number,
  page: number,
  order: string = "ASC",
) => {
  const { data } = await axiosInstance.get(
    `/api/v1/organizations/annual-reviews/${id}/employees`,
    {
      params: {
        limit: limit,
        page: page + 1, // DataGrid page start from 0
        order: order,
      },
    },
  );
  return data;
};

export const getMyListAssessmentPeriod = async (
  iAssignedToReview: boolean,
  limit: number,
  page: number,
  order: string = "ASC",
) => {
  const { data } = await axiosInstance.get(`/api/v1/annual-reviews`, {
    params: {
      iAssignedToReview: iAssignedToReview,
      limit: limit,
      page: page + 1, // DataGrid page start from 0
      order: order,
    },
  });
  return data;
};

export const getListStaffAssignedToMe = async (
  id: number,
  limit: number,
  page: number,
  order: string = "ASC",
) => {
  const { data } = await axiosInstance.get(
    `/api/v1/annual-reviews/${id}/reviewers/employees`,
    {
      params: {
        limit: limit,
        page: page + 1, // DataGrid page start from 0
        order: order,
      },
    },
  );
  return data;
};

export const getListReviewerOfStaff = async (
  assessmentPeriodId: number,
  userId: string,
) => {
  const { data } = await axiosInstance.get(
    `/api/v1/annual-reviews/${assessmentPeriodId}/employees/${userId}/reviewers`,
  );
  return data;
};

export const getDataFormReview = async (
  assessmentPeriodId: number,
  employeeId: string,
) => {
  const { data } = await axiosInstance.get(
    `/api/v1/annual-reviews/${assessmentPeriodId}/employees/${employeeId}/reviews`,
  );
  return data;
};

export const submitDataFormReview = async (
  assessmentPeriodId: number,
  employeeId: string,
  data,
) => {
  const res = await axiosInstance.post(
    `/api/v1/annual-reviews/${assessmentPeriodId}/employees/${employeeId}/reviews`,
    data,
  );
  return res;
};

export const exportDataAssessmentPeriodById = async (
  assessmentPeriodId: number,
) => {
  const { data } = await axiosInstance.get(
    `/api/v1/annual-reviews/${assessmentPeriodId}/export`,
    {
      responseType: "blob",
    },
  );
  return data;
};
