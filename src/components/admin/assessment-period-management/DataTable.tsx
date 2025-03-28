'use client';

import { getListAssessmentPeriod } from '@/services/api';
import { formatDate } from '@/utils';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ButtonImportDataAssessment from './ButtonImportDataAssessment';
import { EyeIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Menu, MenuItem, IconButton } from '@mui/material';
import ButtonExportDataAssessment from './ButtonExportDataAssessment';
import {
  useDataAssessmentPeriodDialogStore,
  useAssessmentPeriodDialogStore,
  useDialogListManagerStore,
} from '@/store';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { IAssessmentPeriodResponseAPI } from '@/types';

const DataTable = () => {
  // Pagination DataGrid
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });

  // Menu state for dropdown
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] =
    React.useState<IAssessmentPeriodResponseAPI | null>(null);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    row: IAssessmentPeriodResponseAPI,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Query get list user
  const listAssessmentPeriodQuery = useQuery({
    queryKey: ['organization-listAssessmentPeriod', paginationModel],
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

  // Data view dialog
  const openDialogDataAssessmentPeriod = useDataAssessmentPeriodDialogStore(
    (state) => state.openDialog,
  );

  const setAssessmentPeriodId = useDataAssessmentPeriodDialogStore(
    (state) => state.setAssessmentPeriodId,
  );

  const setAsessmentPeriodName = useDataAssessmentPeriodDialogStore(
    (state) => state.setAssessmentPeriodName,
  );

  // Dialog List Manager
  const openDialogListManager = useDialogListManagerStore(
    (state) => state.openDialog,
  );
  const setAssessmentPeriodIdListManager = useDialogListManagerStore(
    (state) => state.setAssessmentPeriodId,
  );
  const setAssessmentPeriodNameListManager = useDialogListManagerStore(
    (state) => state.setAssessmentPeriodName,
  );

  // Unified create/edit dialog store
  const openEditDialog = useAssessmentPeriodDialogStore(
    (state) => state.openEditDialog,
  );

  const handleOpenDialogShowData = (id: number, name: string) => {
    openDialogDataAssessmentPeriod();
    setAssessmentPeriodId(id);
    setAsessmentPeriodName(name);
  };

  const handleOpenDialogListManager = (id: number, name: string) => {
    openDialogListManager();
    setAssessmentPeriodIdListManager(id);
    setAssessmentPeriodNameListManager(name);
  };

  const handleOpenEditDialog = (row: IAssessmentPeriodResponseAPI) => {
    openEditDialog(row);
    handleCloseMenu();
  };

  // Define columns
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'start',
      headerName: 'Start time',
      valueGetter: (value) => formatDate(value),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'selfReviewEnd',
      headerName: 'Self review end time',
      valueGetter: (value) => formatDate(value),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'end',
      headerName: 'End time',
      valueGetter: (value) => formatDate(value),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: '',
      headerName: 'Actions',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex h-full items-center justify-center">
            <IconButton onClick={(e) => handleOpenMenu(e, params.row)}>
              <EllipsisVerticalIcon className="h-5 w-5" />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && selectedRow?.id === params.row.id}
              onClose={handleCloseMenu}
            >
              <MenuItem
                onClick={() => {
                  handleOpenDialogShowData(params.row.id, params.row.title);
                  handleCloseMenu();
                }}
              >
                <span className="flex items-center gap-2">
                  <EyeIcon className="h-5 w-5" />
                  View List Employees
                </span>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleOpenDialogListManager(params.row.id, params.row.title);
                  handleCloseMenu();
                }}
              >
                <span className="flex items-center gap-2">
                  <EyeIcon className="h-5 w-5" />
                  View List Managers
                </span>
              </MenuItem>

              <MenuItem onClick={() => handleOpenEditDialog(params.row)}>
                <span className="flex items-center gap-2">
                  <PencilIcon className="h-5 w-5" />
                  Edit Time
                </span>
              </MenuItem>

              <MenuItem>
                <span className="flex items-center gap-2">
                  <ButtonImportDataAssessment
                    assessmentPeriodId={params.row.id}
                  />
                </span>
              </MenuItem>

              <MenuItem>
                <span className="flex items-center gap-2">
                  <ButtonExportDataAssessment
                    assessmentPeriodId={params.row.id}
                    assessmentPeriodTitle={params.row.title}
                  />
                </span>
              </MenuItem>
            </Menu>
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
            variant: 'skeleton',
            noRowsVariant: 'skeleton',
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
