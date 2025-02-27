import { IStaff } from "@/types";

// Make function format number smaller than 10 to 2 digits
export const formatNumberToTwoDigits = (number: number) => {
  return number < 10 ? `0${number}` : number;
};

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

export const formatDate = (date: string) => {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const year = d.getFullYear();

  return `${formatNumberToTwoDigits(day)}/${formatNumberToTwoDigits(month)}/${year}`;
};
