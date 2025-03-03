import { useReviewFormDialogStore } from "@/lib/zustand/reviewFormDialogStore";
import { useStaffDialogSummaryInfoStore } from "@/lib/zustand/staffDialogSummaryInfoStore";
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
import React from "react";

const DialogSummaryInfo = () => {
  const dialogState = useStaffDialogSummaryInfoStore(
    (store) => store.dialogState,
  );
  const handleCloseDialogSummaryInfo = useStaffDialogSummaryInfoStore(
    (store) => store.closeDialog,
  );

	const setUserId = useReviewFormDialogStore((store) => store.setUserId);
  const handleOpenReviewForm = useReviewFormDialogStore(
    (store) => store.openDialog,
  );

  const rows = [
    {
      title: "ID cá nhân:",
      field: "id",
    },
    {
      title: "Họ tên:",
      field: "username",
    },
    {
      title: "Phòng ban:",
      field: "department",
    },
    {
      title: "Vị trí:",
      field: "jobPosition",
    },
    {
      title: "Người đánh giá 1:",
      field: "firstReviewer",
    },
    {
      title: "Người đánh giá 2:",
      field: "secondReviewer",
    },
  ];

  const handleStartReviewForm = () => {
		setUserId(dialogState.data.id);
    handleOpenReviewForm();
    handleCloseDialogSummaryInfo();
  };
  return (
    <Dialog
      open={dialogState.isOpen}
      onClose={handleCloseDialogSummaryInfo}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title" className="text-3xl font-bold">
        Bảng tự đánh giá nhân sự ngày 01/02/2025
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
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <Button onClick={handleStartReviewForm} className="button-primary">
          Bắt đầu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogSummaryInfo;
