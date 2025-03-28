'use client';

import { IAssessmentPeriod, IUpdateAssessmentPeriodPayload } from '@/types';
import { Button, Field, Input, Label } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAssessmentPeriod, updateAssessmentPeriod } from '@/services/api';
import { toast } from 'react-toastify';
import { useAssessmentPeriodDialogStore } from '@/store';
import ErrorMessage from '@/components/forms/ErrorMessage';

/**
 * Dialog component for creating and editing assessment periods
 * Uses a unified store for both operations
 */
const DialogAssessmentPeriod = () => {
  const queryClient = useQueryClient();

  // Unified dialog state
  const {
    isOpen: dialogOpen,
    mode,
    assessmentPeriod,
    closeDialog,
  } = useAssessmentPeriodDialogStore();

  // Determine if dialog is in edit mode
  const isEditMode = mode === 'edit';

  // Mutations
  const createAssessmentPeriodMutation = useMutation({
    mutationFn: createAssessmentPeriod,
    onSuccess: async () => {
      toast.dismiss();
      toast.success('Create new assessment period successfully');
      queryClient.invalidateQueries({
        queryKey: ['organization-listAssessmentPeriod'],
        refetchType: 'active',
      });
      closeDialog();
    },
    onError: (error) => {
      toast.dismiss();
      toast.error('Create new assessment period failed: ' + error.message);
    },
  });

  const updateAssessmentPeriodMutation = useMutation({
    mutationFn: (payload: IUpdateAssessmentPeriodPayload) =>
      updateAssessmentPeriod(payload),
    onSuccess: async () => {
      toast.dismiss();
      toast.success('Update assessment period successfully');
      queryClient.invalidateQueries({
        queryKey: ['organization-listAssessmentPeriod'],
        refetchType: 'active',
      });
      closeDialog();
    },
    onError: (error) => {
      toast.dismiss();
      toast.error('Update assessment period failed: ' + error.message);
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IAssessmentPeriod>({
    defaultValues: {
      title: '',
      start: null as Date | null,
      end: null as Date | null,
      selfReviewEnd: null as Date | null,
    },
  });

  // Load form data when assessment period changes in edit mode
  useEffect(() => {
    if (isEditMode && assessmentPeriod) {
      reset({
        title: assessmentPeriod.title,
        start: assessmentPeriod.start ? new Date(assessmentPeriod.start) : null,
        selfReviewEnd: assessmentPeriod.selfReviewEnd
          ? new Date(assessmentPeriod.selfReviewEnd)
          : null,
        end: assessmentPeriod.end ? new Date(assessmentPeriod.end) : null,
      });
    } else if (!isEditMode) {
      // Reset form when in create mode
      reset({
        title: '',
        start: null as Date | null,
        end: null as Date | null,
        selfReviewEnd: null as Date | null,
      });
    }
  }, [assessmentPeriod, isEditMode, reset]);

  // Watch all date fields for validation
  const startDate = watch('start');
  const selfReviewEndDate = watch('selfReviewEnd');
  const endDate = watch('end');

  const onSubmit: SubmitHandler<IAssessmentPeriod> = (data) => {
    if (isEditMode) {
      // Update existing assessment period
      if (!assessmentPeriod?.id) return;

      toast.loading('Updating assessment period...');
      const payload: IUpdateAssessmentPeriodPayload = {
        id: assessmentPeriod.id,
        ...data,
        start: dayjs(data.start).toDate(),
        end: dayjs(data.end).toDate(),
        selfReviewEnd: dayjs(data.selfReviewEnd).toDate(),
        organizationId: 1,
      };
      updateAssessmentPeriodMutation.mutate(payload);
    } else {
      // Create new assessment period
      toast.loading('Creating new assessment period...');
      const payload = {
        ...data,
        start: dayjs(data.start).toDate(),
        end: dayjs(data.end).toDate(),
        selfReviewEnd: dayjs(data.selfReviewEnd).toDate(),
        organizationId: 1,
      };
      createAssessmentPeriodMutation.mutate(payload);
    }
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
      closeAfterTransition={false}
    >
      <DialogTitle id="alert-dialog-title" className="text-3xl font-bold">
        {isEditMode ? 'Edit Assessment Period' : 'Create New Assessment Period'}
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
          {/* Title */}
          <Field className="flex flex-col gap-1">
            <Label className="label-form">Title</Label>
            <Input
              className="input-form"
              {...register('title', {
                required: 'This field is required',
              })}
            />
            <ErrorMessage errorMessage={errors.title?.message} />
          </Field>

          {/* Start Time */}
          <Field className="flex flex-col gap-1">
            <Label className="label-form">Start Time</Label>
            <Controller
              control={control}
              name="start"
              rules={{
                required: 'This field is required',
                validate: isEditMode
                  ? {
                      notBeforeSelfReview: (value) =>
                        !value ||
                        !selfReviewEndDate ||
                        dayjs(value).isBefore(dayjs(selfReviewEndDate)) ||
                        'Start time must be before self review end time',
                    }
                  : {
                      notBeforeSelfReview: (value) =>
                        !value ||
                        !selfReviewEndDate ||
                        dayjs(value).isBefore(dayjs(selfReviewEndDate)) ||
                        'Start time must be before self review end time',
                      notBeforeToday: (value) =>
                        !value ||
                        dayjs(value).isAfter(dayjs().subtract(1, 'day')) ||
                        'Start time must be today or later',
                    },
              }}
              render={({ field }) => {
                return (
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
                );
              }}
            />
            <ErrorMessage errorMessage={errors.start?.message} />
          </Field>

          {/* Self Review End */}
          <Field className="flex flex-col gap-1">
            <Label className="label-form">Self Review End</Label>
            <Controller
              control={control}
              name="selfReviewEnd"
              rules={{
                required: 'This field is required',
                validate: {
                  afterStart: (value) =>
                    !value ||
                    !startDate ||
                    dayjs(value).isAfter(dayjs(startDate)) ||
                    'Self review end must be after start time',
                  beforeEnd: (value) =>
                    !value ||
                    !endDate ||
                    dayjs(value).isBefore(dayjs(endDate)) ||
                    'Self review end must be before end time',
                },
              }}
              render={({ field }) => {
                return (
                  <DateTimePicker
                    value={field.value ? dayjs(field.value) : null}
                    format="DD/MM/YYYY HH:mm"
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                    slotProps={{ textField: { fullWidth: true } }}
                    shouldDisableDate={(date) =>
                      startDate
                        ? dayjs(date).isBefore(dayjs(), 'day') ||
                          dayjs(date).isBefore(dayjs(startDate), 'day') ||
                          dayjs(date).isSame(dayjs(startDate), 'day') ||
                          dayjs(date).isAfter(dayjs(endDate), 'day')
                        : dayjs(date).isBefore(dayjs(), 'day')
                    }
                  />
                );
              }}
            />
            <ErrorMessage errorMessage={errors.selfReviewEnd?.message} />
          </Field>

          {/* End Time */}
          <Field className="flex flex-col gap-1">
            <Label className="label-form">End Time</Label>
            <Controller
              control={control}
              name="end"
              rules={{
                required: 'This field is required',
                validate: {
                  afterSelfReview: (value) =>
                    !value ||
                    !selfReviewEndDate ||
                    dayjs(value).isAfter(dayjs(selfReviewEndDate)) ||
                    'End time must be after self review end',
                },
              }}
              render={({ field }) => {
                return (
                  <DateTimePicker
                    value={field.value ? dayjs(field.value) : null}
                    format="DD/MM/YYYY HH:mm"
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                    slotProps={{ textField: { fullWidth: true } }}
                    shouldDisableDate={(date) =>
                      selfReviewEndDate
                        ? dayjs(date).isBefore(dayjs(), 'day') ||
                          dayjs(date).isBefore(
                            dayjs(selfReviewEndDate),
                            'day',
                          ) ||
                          dayjs(date).isSame(dayjs(selfReviewEndDate), 'day')
                        : dayjs(date).isBefore(dayjs(), 'day')
                    }
                  />
                );
              }}
            />
            <ErrorMessage errorMessage={errors.end?.message} />
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
          disabled={
            isEditMode
              ? updateAssessmentPeriodMutation?.isPending
              : createAssessmentPeriodMutation?.isPending
          }
          onClick={handleSubmit(onSubmit)}
          className="button-primary"
        >
          {isEditMode
            ? updateAssessmentPeriodMutation.isPending
              ? 'Updating...'
              : 'Update'
            : createAssessmentPeriodMutation.isPending
              ? 'Creating...'
              : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAssessmentPeriod;
