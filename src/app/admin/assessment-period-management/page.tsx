import DataTable from "@/components/admin/assessment-period-management/DataTable";
import Filter from "@/components/admin/assessment-period-management/Filter";
import React from "react";

const AssessmentPeriodManagement = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold">Assessment Period Management</h1>
      <div className="flex items-center justify-between gap-2">
        <Filter />
      </div>
      <DataTable />
    </div>
  );
};

export default AssessmentPeriodManagement;
