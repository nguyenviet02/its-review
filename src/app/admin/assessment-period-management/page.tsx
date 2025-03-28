'use client';

import DataTable from '@/components/admin/assessment-period-management/DataTable';
import { useAssessmentPeriodDialogStore } from '@/store';
import React from 'react';

const AssessmentPeriodManagementPage = () => {
  const { openCreateDialog } = useAssessmentPeriodDialogStore();

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Assessment Period Management</h1>
        <button
          onClick={openCreateDialog}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Create
        </button>
      </div>
      <DataTable />
    </div>
  );
};

export default AssessmentPeriodManagementPage;
