import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import CurrentStatus from "../data-grid/CurrentStatus";
import { IAssessmentMinifyData } from "@/types";

type Props = {
  data: IAssessmentMinifyData[];
};

const DataReviewTable = ({ data }: Props) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "Employee ID" },
    {
      field: "username",
      headerName: "Full Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "jobPosition",
      headerName: "Job Position",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "currentStatus",
      headerName: "Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params: GridRenderCellParams) => {
        return <CurrentStatus currentStatus={params.value} />;
      },
    },
    {
      field: "period",
      headerName: "Assessment Period",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "deadline",
      headerName: "Deadline",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="flex items-center justify-center gap-4">
            <button className="btn btn-primary rounded border border-black p-1 hover:bg-slate-200">
              <DocumentTextIcon className="size-6" />
            </button>
          </div>
        );
      },
    },
  ];
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
    <DataGrid
      sx={dataGridStyle}
      loading={false}
      rows={data}
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
  );
};

export default DataReviewTable;
