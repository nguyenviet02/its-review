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
