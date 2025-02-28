"use client";

import { meQuery } from "@/apis/auth";
import ButtonImportStaffsFromExcel from "@/components/admin/staff-management/ButtonImportStaffsFromExcel";
import DataTable from "@/components/admin/staff-management/DataTable";
import Filter from "@/components/admin/staff-management/Filter";
import { IStaff } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const StaffManagement = () => {
  const [listStaff, setListStaff] = useState<IStaff[]>([]);
	const query = useQuery({ queryKey: ['todos'], queryFn: meQuery })
	
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold">Danh sách nhân sự</h1>
      <div className="flex items-center justify-between gap-2">
        <Filter />
        <ButtonImportStaffsFromExcel setListStaff={setListStaff} />
      </div>
      <DataTable listStaff={listStaff} />
    </div>
  );
};

export default StaffManagement;
