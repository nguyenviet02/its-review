import { getListReviewerOfEmployee } from "@/apis/assessment";
import { useReviewFormDialogStore } from "@/lib/zustand/reviewFormDialogStore";
import { useEmployeeDialogSummaryInfoStore } from "@/lib/zustand/employeeDialogSummaryInfoStore";
import { TSummaryInfoData } from "@/types";
import { Button } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../common/Loading";

const DialogSummaryInfo = () => {
  const dialogState = useEmployeeDialogSummaryInfoStore(
    (store) => store.dialogState,
  );
  const handleCloseDialogSummaryInfo = useEmployeeDialogSummaryInfoStore(
    (store) => store.closeDialog,
  );

  const userId = useReviewFormDialogStore((store) => store.userId);
  const isManager = useReviewFormDialogStore((store) => store.isManager);
  const handleOpenReviewForm = useReviewFormDialogStore(
    (store) => store.openDialog,
  );

  const assessmentPeriodId = useReviewFormDialogStore(
    (store) => store.assessmentPeriodId,
  );

  const rows = [
    {
      title: "Employee ID:",
      field: "id",
    },
    {
      title: "Full Name:",
      field: "username",
    },
    {
      title: "Department:",
      field: "department",
    },
    {
      title: "Job Position:",
      field: "jobPosition",
    },
  ];

  const handleStartReviewForm = () => {
    handleOpenReviewForm();
    handleCloseDialogSummaryInfo();
  };

  const getListReviewerQuery = useQuery({
    queryKey: ["getListReviewerOfEmployee", userId, assessmentPeriodId],
    queryFn: async () =>
      getListReviewerOfEmployee(assessmentPeriodId as number, userId as string),
    refetchOnWindowFocus: false,
    enabled: !!userId && !!assessmentPeriodId && isManager,
  });
  const listReviewer = getListReviewerQuery?.data?.data;

  return (
    <Dialog
      open={dialogState.isOpen}
      onClose={handleCloseDialogSummaryInfo}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title" className="text-3xl font-bold">
        Summary Info
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseDialogSummaryInfo}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <XMarkIcon className="size-6 text-black" />
      </IconButton>
      <DialogContent>
        <Loading isLoading={getListReviewerQuery.isLoading}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.field}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <span className="font-semibold">{row.title}</span>
                    </TableCell>
                    <TableCell>
                      {dialogState.data[row.field as keyof TSummaryInfoData]}
                    </TableCell>
                  </TableRow>
                ))}
                {listReviewer?.map((reviewer, index) => (
                  <TableRow
                    key={reviewer.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <span className="font-semibold">{`Reviewer ${index + 1}:`}</span>
                    </TableCell>
                    <TableCell>{`${reviewer.username}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Loading>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <Button onClick={handleStartReviewForm} className="button-primary">
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogSummaryInfo;
