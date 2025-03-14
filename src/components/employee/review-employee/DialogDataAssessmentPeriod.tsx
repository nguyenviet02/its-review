import { getFormType } from "@/utils";
import { DocumentTextIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid, gridClasses, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CurrentStatus from "@/components/data-grid/CurrentStatus";
import {
  useDataAssessmentPeriodDialogStore,
  useEmployeeDialogSummaryInfoStore,
  useReviewFormDialogStore,
} from "@/store";
import { getListEmployeeAssignedToMe } from "@/services/api";

const DialogDataAssessmentPeriod = () => {
  const dialogState = useDataAssessmentPeriodDialogStore(
    (store) => store.isOpen,
  );
  const handleCloseDataAssessmentPeriodDialog =
    useDataAssessmentPeriodDialogStore((store) => store.closeDialog);
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
      "reviewEmployee-listEmployeeOfAssessmentPeriod",
      assessmentPeriodId,
    ],
    queryFn: () =>
      getListEmployeeAssignedToMe(
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

  // Handle open summary dialog
  const openDialogSummaryInfo = useEmployeeDialogSummaryInfoStore(
    (store) => store.openDialog,
  );
  const setSummaryInfoData = useEmployeeDialogSummaryInfoStore(
    (store) => store.setDialogData,
  );

  const setUserId = useReviewFormDialogStore((store) => store.setUserId);
  const setAssessmentPeriodId = useReviewFormDialogStore(
    (store) => store.setAssessmentPeriodId,
  );
  const setFormType = useReviewFormDialogStore((store) => store.setFormType);
  const setIsManager = useReviewFormDialogStore((store) => store.setIsManager);

  const handleOpenSummaryDialog = (params: GridRenderCellParams) => {
    const isManager = true;
    const formType = getFormType(params.row.jobPosition, isManager);
    setSummaryInfoData({
      id: params.row.id,
      username: params.row.username,
      department: params.row.department,
      jobPosition: params.row.jobPosition,
    });
    setUserId(params.row.id);
    setIsManager(isManager);
    setAssessmentPeriodId(assessmentPeriodId as number);
    setFormType(formType);
    openDialogSummaryInfo();
  };

  // Define columns
  const columns: GridColDef[] = [
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
    {
      field: "result",
      headerName: "Result",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params: GridRenderCellParams) => {
        const status = params.row.status;
        return (
          <div className="flex h-full items-center justify-center">
            <CurrentStatus currentStatus={status} />;
          </div>
        );
      },
    },
    {
      field: "",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <div className="flex h-full cursor-pointer items-center text-black">
            <button
              onClick={() => handleOpenSummaryDialog(params)}
              className="button-secondary mx-auto flex h-8 items-center justify-center rounded"
            >
              <DocumentTextIcon className="size-6" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <Dialog
      open={dialogState}
      onClose={handleCloseDataAssessmentPeriodDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xl"
    >
      <DialogTitle id="alert-dialog-title" className="text-3xl font-bold">
        {assessmentPeriodName}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseDataAssessmentPeriodDialog}
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
          getRowHeight={() => "auto"}
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
          sx={{
            [`& .${gridClasses.cell}`]: {
              py: 1,
            },
          }}
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
