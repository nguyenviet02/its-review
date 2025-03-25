"use client";

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { getMyListAssessmentPeriod } from "@/services/api";
import { formatDate, getFormType } from "@/utils";
import { useSession } from "next-auth/react";
import CurrentStatus from "@/components/common/CurrentStatus";
import {
  useEmployeeDialogSummaryInfoStore,
  useReviewFormDialogStore,
} from "@/store";

const Employee = () => {
  const session = useSession();

  const handleOpenSummaryInfoDialog = useEmployeeDialogSummaryInfoStore(
    (store) => store.openDialog,
  );
  const setDialogData = useEmployeeDialogSummaryInfoStore(
    (store) => store.setDialogData,
  );
  const setUserId = useReviewFormDialogStore((store) => store.setUserId);
  const setAssessmentPeriodId = useReviewFormDialogStore(
    (store) => store.setAssessmentPeriodId,
  );
  const setIsManager = useReviewFormDialogStore((store) => store.setIsManager);
  const setFormType = useReviewFormDialogStore((store) => store.setFormType);

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
      field: "title",
      headerName: "Title",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "start",
      headerName: "Start Time",
      valueGetter: (value) => formatDate(value),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "selfReviewEnd",
      headerName: "Self Review End",
      valueGetter: (value) => formatDate(value),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "end",
      headerName: "End Time",
      valueGetter: (value) => formatDate(value),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "extendTime",
      headerName: "Extend Time",
      headerAlign: "center",
      align: "center",
      valueGetter: (value) => (value ? formatDate(value) : ""),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params: GridRenderCellParams) => {
        const status = params.row.status;
        return <CurrentStatus currentStatus={status} />;
      },
    },
    {
      field: "result",
      headerName: "Result",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        const isManager = false;
        const formType = getFormType(
          session?.data?.user?.jobPosition as string,
          isManager,
        );
        return (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setDialogData({
                  id: session?.data?.user?.id || "",
                  username: session?.data?.user?.username as string,
                  department: session?.data?.user?.department as string,
                  jobPosition: session?.data?.user?.jobPosition as string,
                });
                setUserId(session?.data?.user?.id || "");
                setFormType(formType);
                setAssessmentPeriodId(params.row.id);
                setIsManager(isManager);
                handleOpenSummaryInfoDialog();
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
          getRowId={(row) => row.id}
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

export default Employee;
