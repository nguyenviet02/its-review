import { IStaff } from "@/types";

export const formatDataImportListReviewer = (dataFromExcel: string[]) => {
  const data = dataFromExcel.map((item) => {
    const staffId = item[0];
    const startIndexOfReviewer = 6;
    const reviewers = item.slice(startIndexOfReviewer);
    return {
      staffId,
      reviewerNames: reviewers,
    };
  });
  console.log("☠️ ~ formatDataImportListReviewer ~ data:", data);
  return data;
};

export const formatDataImportListStaff = (dataFromExcel): IStaff[] => {
  const formattedData = dataFromExcel.map((data) => {
    return {
      id: data["ID Cá nhân"],
      username: data["Họ và tên"],
      department: data["Phòng ban"],
      jobPosition: data["Vị trí"],
      email: data["Email"],
      organizationId: 1,
    };
  });
  return formattedData;
};
