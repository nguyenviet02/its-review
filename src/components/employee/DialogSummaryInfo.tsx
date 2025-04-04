import { TSummaryInfoData } from '@/types';
import { Button } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
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
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  useEmployeeDialogSummaryInfoStore,
  useReviewFormDialogStore,
} from '@/store';
import Loading from '../ui/Loading';
import { getListManagerOfEmployee } from '@/services/api';

const DialogSummaryInfo = () => {
  const dialogState = useEmployeeDialogSummaryInfoStore(
    (store) => store.dialogState,
  );
  const handleCloseDialogSummaryInfo = useEmployeeDialogSummaryInfoStore(
    (store) => store.closeDialog,
  );

  const userId = useReviewFormDialogStore((store) => store.userId);
  const handleOpenReviewForm = useReviewFormDialogStore(
    (store) => store.openDialog,
  );

  const assessmentPeriodId = useReviewFormDialogStore(
    (store) => store.assessmentPeriodId,
  );

  const rows = [
    {
      title: 'Employee ID:',
      field: 'id',
    },
    {
      title: 'Full Name:',
      field: 'username',
    },
    {
      title: 'Department:',
      field: 'department',
    },
    {
      title: 'Job Position:',
      field: 'jobPosition',
    },
  ];

  const handleStartReviewForm = () => {
    handleOpenReviewForm();
    handleCloseDialogSummaryInfo();
  };

  const getListManagerQuery = useQuery({
    queryKey: ['getListManagerOfEmployee', userId, assessmentPeriodId],
    queryFn: async () =>
      getListManagerOfEmployee(assessmentPeriodId as number, userId as string),
    refetchOnWindowFocus: false,
    enabled: !!userId && !!assessmentPeriodId,
  });
  const listManager = getListManagerQuery?.data;

  return (
    <Dialog
      open={dialogState.isOpen}
      onClose={handleCloseDialogSummaryInfo}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      closeAfterTransition={false}
      fullWidth
    >
      <DialogTitle id="alert-dialog-title" className="text-3xl font-bold">
        Summary Info
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseDialogSummaryInfo}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <XMarkIcon className="size-6 text-black" />
      </IconButton>
      <DialogContent>
        <Loading isLoading={getListManagerQuery.isLoading}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.field}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <span className="font-semibold">{row.title}</span>
                    </TableCell>
                    <TableCell>
                      {dialogState.data[row.field as keyof TSummaryInfoData]}
                    </TableCell>
                  </TableRow>
                ))}
                {listManager?.map(
                  (
                    manager: { id: string; username: string },
                    index: number,
                  ) => (
                    <TableRow
                      key={manager.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <span className="font-semibold">
                          {`Manager ${index + 1}:`}
                        </span>
                      </TableCell>
                      <TableCell>{`${manager.username}`}</TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Loading>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <Button onClick={handleStartReviewForm} className="button-primary">
          Start Review
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogSummaryInfo;
