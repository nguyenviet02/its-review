"use client";

import { useDialogStaffInfoStore } from "@/lib/zustand/dialogStaffInfoStore";
import { IStaff } from "@/types";
import { Button } from "@headlessui/react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

const DataTable = () => {
  const openDialogStaffInfo = useDialogStaffInfoStore(
    (store) => store.openDialog,
  );
  const setStaffInfo = useDialogStaffInfoStore((store) => store.setStaffInfo);

  const handleOpenDialogStaffInfo = (staffInfo: IStaff) => {
    setStaffInfo(staffInfo);
    openDialogStaffInfo();
  };

  const rows: IStaff[] = [
    {
      id: "ITS001",
      username: "Nguyễn A",
      department: "Team Design",
      jobPosition: "Thiết kế đồ họa",
      email: "NguyenA123@microsoft.com",
      organizationId: 1,
    },
    {
      id: "ITS002",
      username: "Nguyễn A",
      department: "Team Design",
      jobPosition: "Thiết kế đồ họa",
      email: "NguyenA123@microsoft.com",
      organizationId: 1,
    },
    {
      id: "ITS003",
      username: "Nguyễn A",
      department: "Team Design",
      jobPosition: "Thiết kế đồ họa",
      email: "NguyenA123@microsoft.com",
      organizationId: 1,
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID cá nhân",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "username",
      headerName: "Họ tên",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "department",
      headerName: "Phòng ban",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "jobPosition",
      headerName: "Vị trí",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Thao tác",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell(params) {
        return (
          <div className="flex size-full items-center justify-center">
            <Button
              className="flex items-center justify-center rounded border border-gray-500 p-1"
              onClick={() => {
                handleOpenDialogStaffInfo(params.row);
              }}
            >
              <EyeIcon className="h-6 w-6 text-black" />
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="size-full">
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        pageSizeOptions={[10, 15, 20, 25]}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default DataTable;
