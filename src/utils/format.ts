/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEmployee } from "@/types";

/**
 * Format data imported from Excel for manager list
 */
export const formatDataImportListManager = (dataFromExcel: any) => {
  const data = dataFromExcel.map((item: any) => {
    const employeeId = item[0];
    const startIndexOfManager = 2;
    const managers = item.slice(startIndexOfManager);
    return {
      employeeId,
      managerNames: managers as string[],
    };
  });
  return data?.slice(1) || [];
};

/**
 * Format data imported from Excel for employee list
 */
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
			team: data["Team"],
			block: data["Khối"],
    };
  });
  return formattedData;
};
