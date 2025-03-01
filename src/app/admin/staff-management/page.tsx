"use client";

import ButtonImportStaffsFromExcel from "@/components/admin/staff-management/ButtonImportStaffsFromExcel";
import DataTable from "@/components/admin/staff-management/DataTable";
import Filter from "@/components/admin/staff-management/Filter";
import React from "react";

const StaffManagement = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold">Danh sách nhân sự</h1>
      <div className="flex items-center justify-between gap-2">
        <Filter />
        <ButtonImportStaffsFromExcel />
      </div>
      <DataTable />
    </div>
  );
};

export default StaffManagement;
