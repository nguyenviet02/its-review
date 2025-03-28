import { useDialogCongratulationStore } from '@/store';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  IconButton,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
  Button,
} from '@mui/material';
import React from 'react';

const DialogCongratulation = () => {
  const dialogState = useDialogCongratulationStore((store) => store.isOpen);
  const dialogTitle = useDialogCongratulationStore((store) => store.title);
  const dialogContent = useDialogCongratulationStore((store) => store.content);
  const handleClose = useDialogCongratulationStore(
    (store) => store.closeDialog,
  );
  return (
    <Dialog
      open={dialogState}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      closeAfterTransition={false}
    >
      <DialogTitle id="alert-dialog-title" className="text-3xl font-bold">
        {dialogTitle}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <XMarkIcon className="size-6 text-black" />
      </IconButton>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <Button onClick={handleClose} className="button-primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCongratulation;
