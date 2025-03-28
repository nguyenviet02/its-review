'use client';

import React from 'react';
import { Button, Field, Label } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useExtendTimeDialogStore } from '@/store';
import ErrorMessage from '@/components/forms/ErrorMessage';
import { extendTimeForUser } from '@/services/api';

interface ExtendTimeFormData {
  extendTime: Date | null;
}

interface IDataExtendTime {
  assessmentPeriodId: number;
  extendTime: Date;
  employeeId?: string;
  managerId?: string;
}

const DialogExtendTime = () => {
  const queryClient = useQueryClient();

  // Get dialog state from store
  const { isOpen, closeDialog, assessmentPeriodId, employeeId, managerId } =
    useExtendTimeDialogStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExtendTimeFormData>({
    defaultValues: {
      extendTime: null,
    },
  });

  // Reset form when dialog opens/closes
  React.useEffect(() => {
    if (!isOpen) {
      reset({
        extendTime: null,
      });
    }
  }, [isOpen, reset]);

  // Mutation for extending time
  const extendTimeMutation = useMutation({
    mutationFn: async (data: ExtendTimeFormData) => {
      const payload: IDataExtendTime = {
        assessmentPeriodId: assessmentPeriodId as number,
        extendTime: data.extendTime!,
      };
      if (!!employeeId) {
        payload.employeeId = employeeId;
      } else {
        payload.managerId = managerId;
      }
      await extendTimeForUser(payload);
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(
        `Time extended successfully for ${!!employeeId ? 'employee' : 'managers'}`,
      );
      queryClient.invalidateQueries({
        queryKey: [
          'organization-listManagerOfAssessmentPeriod',
          'organization-listEmployeeOfAssessmentPeriod',
        ],
      });
      closeDialog();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Failed to extend time');
    },
  });

  const onSubmit = (data: ExtendTimeFormData) => {
    toast.loading('Extending time...');
    extendTimeMutation.mutate(data);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeDialog}
      aria-labelledby="extend-time-dialog-title"
      fullWidth
      maxWidth="sm"
      closeAfterTransition={false}
    >
      <DialogTitle id="extend-time-dialog-title" className="text-3xl font-bold">
        {!!employeeId ? 'Extend Time for Employee' : 'Extend Time for Manager'}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={closeDialog}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <XMarkIcon className="size-6 text-black" />
      </IconButton>
      <DialogContent className="flex flex-col gap-6">
        <form className="flex flex-col gap-4">
          <Field className="flex flex-col gap-2">
            <Label className="label-form">New Deadline</Label>
            <Controller
              control={control}
              name="extendTime"
              rules={{
                required: 'Deadline is required',
                validate: {
                  futureDate: (value) =>
                    !value ||
                    dayjs(value).isAfter(dayjs()) ||
                    'Deadline must be in the future',
                },
              }}
              render={({ field }) => (
                <DateTimePicker
                  value={field.value ? dayjs(field.value) : null}
                  format="DD/MM/YYYY HH:mm"
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                  slotProps={{ textField: { fullWidth: true } }}
                  shouldDisableDate={(date) =>
                    dayjs(date).isBefore(dayjs(), 'day')
                  }
                />
              )}
            />
            <ErrorMessage errorMessage={errors.extendTime?.message} />
          </Field>
        </form>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <Button
          disabled={extendTimeMutation.isPending}
          onClick={handleSubmit(onSubmit)}
          className="button-primary"
        >
          {extendTimeMutation.isPending ? 'Extending...' : 'Extend Time'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogExtendTime;
