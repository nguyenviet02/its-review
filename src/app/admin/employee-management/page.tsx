"use server";

import ButtonImportEmployeesFromExcel from "@/components/admin/employee-management/ButtonImportEmployeesFromExcel";
import DataTable from "@/components/admin/employee-management/DataTable";
import Filter from "@/components/admin/employee-management/Filter";
import React from "react";

const EmployeeManagement = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold">List of Employees</h1>
      <div className="flex items-center justify-between gap-2">
        <Filter />
        <ButtonImportEmployeesFromExcel />
      </div>
      <DataTable />
    </div>
  );
};

export default EmployeeManagement;
