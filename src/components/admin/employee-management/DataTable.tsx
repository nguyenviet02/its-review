'use client';

import { getListUser } from '@/services/api';
import { useDialogEmployeeInfoStore } from '@/store';
import { IEmployee } from '@/types';
import { Button } from '@headlessui/react';
import { EyeIcon } from '@heroicons/react/24/outline';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const DataTable = () => {
  // Dialog State from Zustand
  const openDialogEmployeeInfo = useDialogEmployeeInfoStore(
    (store) => store.openDialog
  );
  const setEmployeeInfo = useDialogEmployeeInfoStore(
    (store) => store.setEmployeeInfo
  );
  const handleOpenDialogEmployeeInfo = (employeeInfo: IEmployee) => {
    setEmployeeInfo(employeeInfo);
    openDialogEmployeeInfo();
  };

  // Pagination DataGrid
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });

  // Query get list user
  const listUserQuery = useQuery({
    queryKey: ['users-listUser', paginationModel],
    queryFn: () => getListUser(paginationModel.pageSize, paginationModel.page),
    refetchOnWindowFocus: false,
  });
  const listUser = listUserQuery?.data?.data;

  // Row count for DataGrid pagination
  const rowCountRef = React.useRef(
    listUserQuery?.data?.pagination?.totalRecords || 0
  );
  const rowCount = React.useMemo(() => {
    if (listUserQuery?.data?.pagination?.totalRecords !== undefined) {
      rowCountRef.current = listUserQuery?.data?.pagination?.totalRecords;
    }
    return rowCountRef.current;
  }, [listUserQuery?.data?.pagination?.totalRecords]);

  // Define columns
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Employee ID',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'username',
      headerName: 'Full Name',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'block',
      headerName: 'Block',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'department',
      headerName: 'Department',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'team',
      headerName: 'Team',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'jobPosition',
      headerName: 'Job Position',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1.5,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'action',
      headerName: 'Actions',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell(params) {
        return (
          <div className="flex size-full items-center justify-center">
            <Button
              className="flex items-center justify-center rounded border border-gray-500 p-1"
              onClick={() => {
                handleOpenDialogEmployeeInfo(params.row);
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
        rows={listUser}
        columns={columns}
        getRowId={(row) => row.id}
        loading={listUserQuery?.isLoading}
        slotProps={{
          loadingOverlay: {
            variant: 'skeleton',
            noRowsVariant: 'skeleton',
          },
        }}
        disableRowSelectionOnClick
        paginationMode="server"
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[10, 15, 20, 25]}
      />
    </div>
  );
};

export default DataTable;
