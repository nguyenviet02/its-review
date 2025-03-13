/* eslint-disable @typescript-eslint/no-explicit-any */
import { FORM_TYPES, IEmployee } from "@/types";

// Make function format number smaller than 10 to 2 digits
export const formatNumberToTwoDigits = (number: number) => {
  return number < 10 ? `0${number}` : number;
};
export const formatDataImportListManager = (dataFromExcel: any) => {
  const data = dataFromExcel.map((item: any) => {
    const employeeId = item[0];
    const startIndexOfManager = 6;
    const managers = item.slice(startIndexOfManager);
    return {
      employeeId,
      managerNames: managers as string[],
    };
  });
  return data?.slice(1) || [];
};

export const formatDataImportListEmployee = (
  dataFromExcel: any,
): IEmployee[] => {
  const formattedData = dataFromExcel.map((data: any) => {
    return {
      id: data["ID Cá nhân"],
      username: data["Họ và tên"],
      department: data["Phòng ban"],
      jobPosition: data["Vị trí"],
      email: data["Email"],
      organizationId: data["organizationId"] || 1,
    };
  });
  return formattedData;
};

export const formatDate = (date: string) => {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const year = d.getFullYear();

  return `${formatNumberToTwoDigits(day)}/${formatNumberToTwoDigits(month)}/${year}`;
};

const developerPositions = [
  "dev",
  "developer",
  "fullstack",
  "frontend",
  "backend",
  "mobile",
];

export const getFormType = (jobPosition: string, isManager: boolean) => {
  let formType = FORM_TYPES.UNSET;
  const jobPositionFormatted = jobPosition
    .trim()
    .toLowerCase()
    .replaceAll(/[\s\-_.,!@#$%^&*()]/g, "");
  if (isManager) {
    if (developerPositions.includes(jobPositionFormatted)) {
      formType = FORM_TYPES.FOR_DEV_MANAGER_V1;
    } else if (jobPositionFormatted === "its") {
      formType = FORM_TYPES.FOR_ITS_MANAGER_V1;
    } else {
      formType = FORM_TYPES.FOR_ITS_MANAGER_V1;
    }
  }
  if (!isManager) {
    if (developerPositions.includes(jobPositionFormatted)) {
      formType = FORM_TYPES.FOR_DEV_V1;
    } else if (jobPositionFormatted === "its") {
      formType = FORM_TYPES.FOR_ITS_V1;
    } else {
      formType = FORM_TYPES.FOR_ITS_V1;
    }
  }
  return formType;
};
