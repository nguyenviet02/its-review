"use client";

import { getListAssessmentPeriod } from "@/apis/assessment";
import { formatDate } from "@/utils";
import { DataGrid, GridColDef, GridRowParams, useGridApiContext, useGridSelector } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const DataTable = () => {

  // Pagination DataGrid
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });

  // Query get list user
  const listAssessmentPeriodQuery = useQuery({
    queryKey: ["organization-listAssessmentPeriod", paginationModel],
    queryFn: () => getListAssessmentPeriod(paginationModel.pageSize, paginationModel.page),
    refetchOnWindowFocus: false,
  });
  const listUser = listAssessmentPeriodQuery?.data?.data?.data;

  // Row count for DataGrid pagination
  const rowCountRef = React.useRef(
    listAssessmentPeriodQuery?.data?.data?.pagination?.totalRecords || 0,
  );
  const rowCount = React.useMemo(() => {
    if (listAssessmentPeriodQuery?.data?.data?.pagination?.totalRecords !== undefined) {
      rowCountRef.current = listAssessmentPeriodQuery?.data?.data?.pagination?.totalRecords;
    }
    return rowCountRef.current;
  }, [listAssessmentPeriodQuery?.data?.data?.pagination?.totalRecords]);

	const getDetailPanelContent = React.useCallback(
    ({ row }: GridRowParams) => {
			console.log(row);
			return <div>Detail</div>;
		},
    [],
  );

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
  ];

  return (
    <div className="size-full">
      <DataGrid
        rows={listUser}
        columns={columns}
        getRowId={(row) => row.id}
        loading={listAssessmentPeriodQuery?.isLoading}
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
