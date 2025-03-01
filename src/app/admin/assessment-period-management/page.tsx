import Filter from "@/components/admin/assessment-period-management/Filter";
import React from "react";

type Props = {};

const AssessmentPeriodManagement = (props: Props) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold">Quản lý kỳ đánh giá </h1>
      <div className="flex items-center justify-between gap-2">
        <Filter />
      </div>
    </div>
  );
};

export default AssessmentPeriodManagement;
