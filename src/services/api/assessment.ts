import {
  IAssessmentPeriod,
  IAssessmentPeriodImportData,
  IUpdateAssessmentPeriodPayload,
} from "@/types";
import axiosInstance from "./axiosInstance";

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

export const submitDataFormReview = async (
  assessmentPeriodId: number,
  employeeId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
) => {
  const res = await axiosInstance.post(
    `/api/v1/annual-reviews/${assessmentPeriodId}/employees/${employeeId}/reviews`,
    data,
  );
  return res;
};

// PATCH
export const updateAssessmentPeriod = async (
  payload: IUpdateAssessmentPeriodPayload,
) => {
  const { id, ...data } = payload;
  const res = await axiosInstance.patch(
    `/api/v1/organizations/annual-reviews/${id}`,
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
  const { data } = await axiosInstance.get(
    `/api/v1/organizations/annual-reviews`,
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

export const getListEmployeeOfAssessmentPeriod = async (
  assessmentPeriodId: number,
  limit: number,
  page: number,
  order: string = "ASC",
) => {
  const { data } = await axiosInstance.get(
    `/api/v1/organizations/annual-reviews/${assessmentPeriodId}/employees`,
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

export const getListManagerOfAssessmentPeriod = async (
  assessmentPeriodId: number,
  limit: number,
  page: number,
  order: string = "ASC",
) => {
  const { data } = await axiosInstance.get(
    `/api/v1/organizations/annual-reviews/${assessmentPeriodId}/managers`,
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
  assignedToReview: boolean,
  limit: number,
  page: number,
  order: string = "ASC",
) => {
  const { data } = await axiosInstance.get(`/api/v1/annual-reviews`, {
    params: {
      assignedToReview: assignedToReview,
      limit: limit,
      page: page + 1, // DataGrid page start from 0
      order: order,
    },
  });
  return data;
};

export const getListEmployeeAssignedToMe = async (
  id: number,
  limit: number,
  page: number,
  order: string = "ASC",
) => {
  const { data } = await axiosInstance.get(
    `/api/v1/annual-reviews/${id}/managers/employees`,
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

export const getListManagerOfEmployee = async (
  assessmentPeriodId: number,
  userId: string,
) => {
  const { data } = await axiosInstance.get(
    `/api/v1/annual-reviews/${assessmentPeriodId}/employees/${userId}/managers`,
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

export const extendTimeForUser = async (
  assessmentPeriodId: number,
  employeeId: string,
  managerId: string,
  extendTime: Date,
) => {
  const body = {
    employeeId: employeeId,
    managerId: managerId,
    extendTime: extendTime,
  };
  const { data } = await axiosInstance.post(
    `/api/v1/organizations/annual-reviews/${assessmentPeriodId}/extend-time`,
    body,
  );
  return data;
};
