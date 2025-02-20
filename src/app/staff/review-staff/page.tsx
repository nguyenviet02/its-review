"use client";

import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import React from "react";
import CurrentStatus from "@/components/data-grid/CurrentStatus";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import Filter from "@/components/staff/Filter";

const mockData: GridRowsProp = [
  {
    id: 3,
    period: "03-2025",
    data: [
      {
        id: "ITS0004",
        name: "Nguyễn Văn D",
        department: "Team Design",
        position: "Designer",
        currentStatus: "waitingManager",
        period: "03-2025",
        deadline: "12/03/2025",
      },
      {
        id: "ITS0005",
        name: "Nguyễn Văn E",
        department: "Team Design",
        position: "Designer",
        currentStatus: "waitingManager",
        period: "03-2025",
        deadline: "12/03/2025",
      },
      {
        id: "ITS0006",
        name: "Nguyễn Văn F",
        department: "Team Design",
        position: "Designer",
        currentStatus: "waitingManager",
        period: "03-2025",
        deadline: "12/03/2025",
      },
    ],
  },
  {
    id: 1,
    period: "03-2025",
    data: [
      {
        id: "ITS0001",
        name: "Nguyễn Văn A",
        department: "Team Design",
        position: "Designer",
        currentStatus: "waitingFillForm",
        period: "03-2025",
        deadline: "12/03/2025",
      },
    ],
  },
  {
    id: 2,
    period: "03-2025",
    data: [
      {
        id: "ITS0002",
        name: "Nguyễn Văn B",
        department: "Team Design",
        position: "Designer",
        currentStatus: "waitingManager",
        period: "03-2025",
        deadline: "12/03/2025",
      },
      {
        id: "ITS0003",
        name: "Nguyễn Văn C",
        department: "Team Design",
        position: "Designer",
        currentStatus: "waitingBO",
        period: "03-2025",
        deadline: "12/03/2025",
      },
    ],
  },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID Cá nhân", flex: 1 },
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
    field: "currentStatus",
    headerName: "Bước duyệt",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: (params: GridRenderCellParams) => {
      return <CurrentStatus currentStatus={params.value} />;
    },
  },
  {
    field: "period",
    headerName: "Kỳ đánh giá",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "deadline",
    headerName: "Hạn điền đơn",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "action",
    headerName: "Thao tác",
    headerAlign: "center",
    align: "center",
    renderCell: (params: GridRenderCellParams) => {
      return (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => {
              console.log(params);
            }}
            className="btn btn-primary rounded border border-black p-1 hover:bg-slate-200"
          >
            <DocumentTextIcon className="size-6" />
          </button>
        </div>
      );
    },
  },
];

const ReviewStaff = () => {
  const dataGridStyle = {
    "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
      py: "8px",
    },
    "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
      py: "15px",
    },
    "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
      py: "22px",
    },
  };
  return (
    <section className="flex w-full flex-col gap-8">
      <Filter />
      {mockData?.map((item) => {
        return (
          <div key={item.id} className="flex w-full flex-col gap-2">
            <h1 className="text-xl">Kỳ đánh giá {item.period}</h1>
            <DataGrid
              sx={dataGridStyle}
              loading={false}
              rows={item.data}
              columns={columns}
              getRowHeight={() => "auto"}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 25]}
              slotProps={{
                loadingOverlay: {
                  variant: "skeleton",
                  noRowsVariant: "skeleton",
                },
              }}
            />
          </div>
        );
      })}
    </section>
  );
};

export default ReviewStaff;
