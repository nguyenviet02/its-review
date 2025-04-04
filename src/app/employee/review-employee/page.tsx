'use client';

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyListAssessmentPeriod } from '@/services/api';
import { formatDate } from '@/utils';
import { useDataAssessmentPeriodDialogStore } from '@/store';

const dataGridStyle = {
  '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
    py: '8px',
  },
  '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
    py: '15px',
  },
  '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
    py: '22px',
  },
};

const ReviewEmployee = () => {
  // Pagination DataGrid
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });

  const myListAssessmentPeriodQuery = useQuery({
    queryKey: ['myListAssessmentPeriod', paginationModel],
    queryFn: () =>
      getMyListAssessmentPeriod(
        true,
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

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'start',
      headerName: 'Start Time',
      valueGetter: (value) => formatDate(value),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'selfReviewEnd',
      headerName: 'Self Review End',
      valueGetter: (value) => formatDate(value),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'end',
      headerName: 'End Time',
      valueGetter: (value) => formatDate(value),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'extendTime',
      headerName: 'Extend Time',
      headerAlign: 'center',
      align: 'center',
      valueGetter: (value) => (value ? formatDate(value) : ''),
    },
    {
      field: 'action',
      headerName: 'Actions',
      headerAlign: 'center',
      align: 'center',
      minWidth: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() =>
                handleOpenDialogShowData(params.row.id, params.row.title)
              }
              className="btn btn-primary rounded border border-black p-1 py-2 hover:bg-slate-200"
            >
              View Detail
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
          rowCount={rowCount}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          getRowHeight={() => 'auto'}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 25]}
          slotProps={{
            loadingOverlay: {
              variant: 'skeleton',
              noRowsVariant: 'skeleton',
            },
          }}
          paginationMode="server"
        />
      </div>
    </section>
  );
};

export default ReviewEmployee;
