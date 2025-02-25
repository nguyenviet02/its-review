"use client";

import { IStaff, STAFF_STATUS } from "@/types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

const DataTable = () => {
  const rows: IStaff[] = [
    {
      staffId: "ITS001",
      name: "Nguyễn A",
      department: "Team Design",
      position: "Thiết kế đồ họa",
      email: "NguyenA123@microsoft.com",
      status: STAFF_STATUS.ACTIVE,
    },
    {
      staffId: "ITS002",
      name: "Nguyễn A",
      department: "Team Design",
      position: "Thiết kế đồ họa",
      email: "NguyenA123@microsoft.com",
      status: STAFF_STATUS.ACTIVE,
    },
    {
      staffId: "ITS003",
      name: "Nguyễn A",
      department: "Team Design",
      position: "Thiết kế đồ họa",
      email: "NguyenA123@microsoft.com",
      status: STAFF_STATUS.ACTIVE,
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "staffId",
      headerName: "ID cá nhân",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
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
      field: "position",
      headerName: "Vị trí",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Thao tác",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ];
  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.staffId}
        pageSizeOptions={[10, 15, 20, 25]}
      />
    </div>
  );
};

export default DataTable;
