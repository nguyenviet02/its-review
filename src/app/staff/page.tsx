"use client";

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useStaffDialogSummaryInfoStore } from "@/lib/zustand/staffDialogSummaryInfoStore";
import { useQuery } from "@tanstack/react-query";
import { getMyListAssessmentPeriod } from "@/apis/assessment";
import { formatDate } from "@/utils";
import { useSession } from "next-auth/react";

const Staff = () => {
  const session = useSession();
  console.log("☠️ ~ Staff ~ session:", session);

  const handleOpenDialog = useStaffDialogSummaryInfoStore(
    (store) => store.openDialog,
  );
  const setDialogData = useStaffDialogSummaryInfoStore(
    (store) => store.setDialogData,
  );

  // Pagination DataGrid
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });

  const myListAssessmentPeriodQuery = useQuery({
    queryKey: ["myListAssessmentPeriod"],
    queryFn: () =>
      getMyListAssessmentPeriod(
        false,
        paginationModel.pageSize,
        paginationModel.page,
      ),
    refetchOnWindowFocus: false,
  });
  const listAssessmentPeriod = myListAssessmentPeriodQuery?.data?.data;

  // Row count for DataGrid pagination
  const rowCountRef = React.useRef(
    myListAssessmentPeriodQuery?.data?.pagination?.totalRecords || 0,
  );
  const rowCount = React.useMemo(() => {
    if (
      myListAssessmentPeriodQuery?.data?.pagination?.totalRecords !== undefined
    ) {
      rowCountRef.current =
        myListAssessmentPeriodQuery?.data?.pagination?.totalRecords;
    }
    return rowCountRef.current;
  }, [myListAssessmentPeriodQuery?.data?.pagination?.totalRecords]);

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
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "title",
      headerName: "Tên kỳ đánh giá",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "start",
      headerName: "Thời gian bắt đầu",
      valueGetter: (value) => formatDate(value),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "end",
      headerName: "Thời gian kết thúc",
      valueGetter: (value) => formatDate(value),
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
                setDialogData({
                  id: session?.data?.user?.id || "",
                  username: session?.data?.user?.username as string,
                  department: session?.data?.user?.department as string,
                  jobPosition: session?.data?.user?.jobPosition as string,
                  firstReviewer: "",
                  secondReviewer: "",
                  assessmentPeriodId: params.row.id,
                });
                handleOpenDialog();
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
  return (
    <section className="flex w-full flex-col gap-8">
      {/* <Filter /> */}
      <div className="flex w-full flex-col gap-2">
        <DataGrid
          sx={dataGridStyle}
          loading={myListAssessmentPeriodQuery.isLoading}
          rows={listAssessmentPeriod}
          columns={columns}
          getRowHeight={() => "auto"}
          disableRowSelectionOnClick
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
          }}
          paginationMode="server"
          rowCount={rowCount}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 15, 20, 25]}
        />
      </div>
    </section>
  );
};

export default Staff;
