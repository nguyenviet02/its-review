"use client";

import { getListAssessmentPeriod } from "@/services/api";
import { formatDate } from "@/utils";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ButtonImportDataAssessment from "./ButtonImportDataAssessment";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@mui/material";
import ButtonExportDataAssessment from "./ButtonExportDataAssessment";
import { useDataAssessmentPeriodDialogStore } from "@/store";

const DataTable = () => {
  // Pagination DataGrid
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });

  // Query get list user
  const listAssessmentPeriodQuery = useQuery({
    queryKey: ["organization-listAssessmentPeriod", paginationModel],
    queryFn: () =>
      getListAssessmentPeriod(paginationModel.pageSize, paginationModel.page),
    refetchOnWindowFocus: false,
  });
  const listAssessmentPeriod = listAssessmentPeriodQuery?.data?.data;

  // Row count for DataGrid pagination
  const rowCountRef = React.useRef(
    listAssessmentPeriodQuery?.data?.pagination?.totalRecords || 0,
  );
  const rowCount = React.useMemo(() => {
    if (
      listAssessmentPeriodQuery?.data?.pagination?.totalRecords !== undefined
    ) {
      rowCountRef.current =
        listAssessmentPeriodQuery?.data?.pagination?.totalRecords;
    }
    return rowCountRef.current;
  }, [listAssessmentPeriodQuery?.data?.pagination?.totalRecords]);

  const getDetailPanelContent = React.useCallback(({ row }: GridRowParams) => {
    console.log(row);
    return <div>Detail</div>;
  }, []);

  const openDialogDataAssessmentPeriod = useDataAssessmentPeriodDialogStore(
    (store) => store.openDialog,
  );

  const setAssessmentPeriodId = useDataAssessmentPeriodDialogStore(
    (store) => store.setAssessmentPeriodId,
  );

  const setAsessmentPeriodName = useDataAssessmentPeriodDialogStore(
    (store) => store.setAssessmentPeriodName,
  );

  const handleOpenDialogShowData = (id: number, name: string) => [
    openDialogDataAssessmentPeriod(),
    setAssessmentPeriodId(id),
    setAsessmentPeriodName(name),
  ];

  // Define columns
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "start",
      headerName: "Start time",
      valueGetter: (value) => formatDate(value),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "selfReviewEnd",
      headerName: "Self review end time",
      valueGetter: (value) => formatDate(value),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "end",
      headerName: "End time",
      valueGetter: (value) => formatDate(value),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex h-full items-center justify-center gap-2">
            <Tooltip title="View detail" arrow>
              <button
                onClick={() =>
                  handleOpenDialogShowData(params.row.id, params.row.title)
                }
                className="rounded border border-black p-2 text-black"
              >
                <EyeIcon className="h-5 w-5" />
              </button>
            </Tooltip>
            <Tooltip title="Import" arrow>
              <div>
                <ButtonImportDataAssessment
                  assessmentPeriodId={params.row.id}
                />
              </div>
            </Tooltip>
            <Tooltip title="Export" arrow>
              <div>
                <ButtonExportDataAssessment
                  assessmentPeriodId={params.row.id}
                  assessmentPeriodTitle={params.row.title}
                />
              </div>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <div className="size-full">
      <DataGrid
        rows={listAssessmentPeriod}
        columns={columns}
        getRowId={(row) => row.id}
        loading={
          listAssessmentPeriodQuery?.isLoading ||
          listAssessmentPeriodQuery?.isFetching
        }
        getDetailPanelContent={getDetailPanelContent}
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
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default DataTable;
