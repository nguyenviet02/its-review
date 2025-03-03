import { getListStaffAssignedToMe } from "@/apis/assessment";
import { useReviewFormDialogStore } from "@/lib/zustand/reviewFormDialogStore";
import { useDataAssessmentPeriodDialogStore } from "@/lib/zustand/staff/dialogDataAssessmentPeriodStore";
import { useStaffDialogSummaryInfoStore } from "@/lib/zustand/staffDialogSummaryInfoStore";
import { JOB_POSITIONS } from "@/types";
import { getFormType } from "@/utils";
import { DocumentTextIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import React from "react";

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

  const listStaffOfAssessmentPeriodQuery = useQuery({
    queryKey: ["reviewStaff-listStaffOfAssessmentPeriod", assessmentPeriodId],
    queryFn: () =>
      getListStaffAssignedToMe(
        assessmentPeriodId as number,
        paginationModel.pageSize,
        paginationModel.page,
      ),
    refetchOnWindowFocus: false,
    enabled: !!assessmentPeriodId,
  });
  const listStaff = listStaffOfAssessmentPeriodQuery?.data?.data;

  // Row count for DataGrid pagination
  const rowCountRef = React.useRef(
    listStaffOfAssessmentPeriodQuery?.data?.pagination?.totalRecords || 0,
  );
  const rowCount = React.useMemo(() => {
    if (
      listStaffOfAssessmentPeriodQuery?.data?.pagination?.totalRecords !==
      undefined
    ) {
      rowCountRef.current =
        listStaffOfAssessmentPeriodQuery?.data?.pagination?.totalRecords;
    }
    return rowCountRef.current;
  }, [listStaffOfAssessmentPeriodQuery?.data?.pagination?.totalRecords]);

  // Handle open summary dialog
  const openDialogSummaryInfo = useStaffDialogSummaryInfoStore(
    (store) => store.openDialog,
  );
  const setSummaryInfoData = useStaffDialogSummaryInfoStore(
    (store) => store.setDialogData,
  );

  const setAssessmentPeriodId = useReviewFormDialogStore(
    (store) => store.setAssessmentPeriodId,
  );
  const setFormType = useReviewFormDialogStore((store) => store.setFormType);

  const handleOpenSummaryDialog = (params: GridRenderCellParams) => {
    const isManager = true;
		const newJobPosition = JOB_POSITIONS.DEV
    const formType = getFormType(
      newJobPosition,
      isManager,
    );
    setSummaryInfoData({
      id: params.row.id,
      username: params.row.username,
      department: params.row.department,
      jobPosition: params.row.jobPosition,
      firstReviewer: params.row.firstReviewer,
      secondReviewer: params.row.secondReviewer,
    });
		setAssessmentPeriodId(assessmentPeriodId as number);
		setFormType(formType);
    openDialogSummaryInfo();
  };

  // Define columns
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID cá nhân",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "username",
      headerName: "Họ tên",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "department",
      headerName: "Phòng ban",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "jobPosition",
      headerName: "Vị trí",
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
      field: "",
      headerName: "Thao tác",
      flex: 1,
      headerAlign: "center",
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
      maxWidth="lg"
    >
      <DialogTitle id="alert-dialog-title" className="text-3xl font-bold">
        Danh sách nhân sự {assessmentPeriodName}
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
          rows={listStaff}
          columns={columns}
          getRowId={(row) => row.id}
          loading={listStaffOfAssessmentPeriodQuery?.isLoading}
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
