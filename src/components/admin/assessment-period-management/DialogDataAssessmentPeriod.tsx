import { getListEmployeeOfAssessmentPeriod } from "@/apis/assessment";
import { useDataAssessmentPeriodDialogStore } from "@/lib/zustand/dialogDataAssessmentPeriodStore";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const DialogDataAssessmentPeriod = () => {
  const dialogState = useDataAssessmentPeriodDialogStore(
    (store) => store.isOpen,
  );
  const handleClose = useDataAssessmentPeriodDialogStore(
    (store) => store.closeDialog,
  );
  const assessmentPeriodId = useDataAssessmentPeriodDialogStore(
    (store) => store.assessmentPeriodId,
  );
  const assessmentPeriodName = useDataAssessmentPeriodDialogStore(
    (store) => store.assessmentPeriodName,
  );

  // Pagination DataGrid
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });

  const listEmployeeOfAssessmentPeriodQuery = useQuery({
    queryKey: [
      "organization-listEmployeeOfAssessmentPeriod",
      assessmentPeriodId,
    ],
    queryFn: () =>
      getListEmployeeOfAssessmentPeriod(
        assessmentPeriodId as number,
        paginationModel.pageSize,
        paginationModel.page,
      ),
    refetchOnWindowFocus: false,
    enabled: !!assessmentPeriodId,
  });
  const listEmployee = listEmployeeOfAssessmentPeriodQuery?.data?.data;

  // Row count for DataGrid pagination
  const rowCountRef = React.useRef(
    listEmployeeOfAssessmentPeriodQuery?.data?.pagination?.totalRecords || 0,
  );
  const rowCount = React.useMemo(() => {
    if (
      listEmployeeOfAssessmentPeriodQuery?.data?.pagination?.totalRecords !==
      undefined
    ) {
      rowCountRef.current =
        listEmployeeOfAssessmentPeriodQuery?.data?.pagination?.totalRecords;
    }
    return rowCountRef.current;
  }, [listEmployeeOfAssessmentPeriodQuery?.data?.pagination?.totalRecords]);

  // Define columns
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Employee ID",
      headerAlign: "center",
      align: "center",
    },
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
      field: "email",
      headerName: "Email",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <Dialog
      open={dialogState}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle id="alert-dialog-title" className="text-3xl font-bold">
        List of Employees {assessmentPeriodName}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <XMarkIcon className="size-6 text-black" />
      </IconButton>
      <DialogContent className="flex flex-col gap-6">
        <DataGrid
          rows={listEmployee}
          columns={columns}
          getRowId={(row) => row.id}
          loading={listEmployeeOfAssessmentPeriodQuery?.isLoading}
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
          }}
          disableRowSelectionOnClick
          paginationMode="server"
          rowCount={rowCount}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 15, 20, 25]}
        />
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
          padding: "1rem",
        }}
      ></DialogActions>
    </Dialog>
  );
};

export default DialogDataAssessmentPeriod;
