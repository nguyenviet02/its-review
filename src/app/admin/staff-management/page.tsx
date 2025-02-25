"use server";

import DataTable from "@/components/admin/staff-management/DataTable";
import Filter from "@/components/admin/staff-management/Filter";
import ButtonImportExcel from "@/components/common/ButtonImportExcel";
import React from "react";

type Props = {};

const StaffManagement = (props: Props) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold">Danh sách nhân sự</h1>
      <div className="flex items-center gap-2">
        <Filter />
        <ButtonImportExcel />
      </div>
        <DataTable />
    </div>
  );
};

export default StaffManagement;
