import { IAssessmentPeriod } from "@/types";
import { Button, Field, Input, Label } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAssessmentPeriod } from "@/services/api";
import { toast } from "react-toastify";
import { useCreateAssessmentPeriodDialogStore } from "@/store";
import ErrorMessage from "@/components/forms/ErrorMessage";

const DialogCreateAssessmentPeriod = () => {
  const queryClient = useQueryClient();
  const dialogState = useCreateAssessmentPeriodDialogStore(
    (store) => store.isOpen,
  );
  const handleClose = useCreateAssessmentPeriodDialogStore(
    (store) => store.closeDialog,
  );

  const createAssessmentPeriodMutation = useMutation({
    mutationFn: createAssessmentPeriod,
    onSuccess: async () => {
      toast.dismiss();
      toast.success("Create new assessment period successfully");
      queryClient.invalidateQueries({
        queryKey: ["organization-listAssessmentPeriod"],
        refetchType: "active",
      });
      handleClose();
    },
    onError: (error) => {
      console.log("☠️ ~ DialogCreateAssessmentPeriod ~ error:", error);
      toast.dismiss();
      toast.error("Create new assessment period failed");
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IAssessmentPeriod>({
    defaultValues: {
      title: "",
      start: null as Date | null,
      end: null as Date | null,
      selfReviewEnd: null as Date | null,
      managerReviewEnd: null as Date | null,
    },
  });

  // Watch all date fields for validation
  const startDate = watch("start");
  const selfReviewEndDate = watch("selfReviewEnd");
  const managerReviewEndDate = watch("managerReviewEnd");
  const endDate = watch("end");

  const onSubmit: SubmitHandler<IAssessmentPeriod> = (data) => {
    toast.loading("Creating new assessment period...");
    const payload = {
      ...data,
      start: dayjs(data.start).toDate(),
      end: dayjs(data.end).toDate(),
      organizationId: 1,
    };
    createAssessmentPeriodMutation.mutate(payload);
  };

  return (
    <Dialog
      open={dialogState}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="alert-dialog-title" className="text-3xl font-bold">
        Create New Assessment Period
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
        <form className="flex flex-col gap-4">
          {/* Title */}
          <Field className="flex flex-col gap-1">
            <Label className="label-form">Title</Label>
            <Input
              className="input-form"
              {...register("title", {
                required: "This field is required",
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
                required: "This field is required",
                validate: {
                  notBeforeSelfReview: (value) =>
                    !value ||
                    !selfReviewEndDate ||
                    dayjs(value).isBefore(dayjs(selfReviewEndDate)) ||
                    "Start time must be before self review end time",
                  notBeforeToday: (value) =>
                    !value ||
                    dayjs(value).isAfter(dayjs().subtract(1, "day")) ||
                    "Start time must be today or later",
                },
              }}
              render={({ field }) => {
                return (
                  <DatePicker
                    value={dayjs(field.value)}
                    format="DD/MM/YYYY"
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                    slotProps={{ textField: { fullWidth: true } }}
                    shouldDisableDate={(date) =>
                      dayjs(date).isBefore(dayjs(), "day")
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
                required: "This field is required",
                validate: {
                  afterStart: (value) =>
                    !value ||
                    !startDate ||
                    dayjs(value).isAfter(dayjs(startDate)) ||
                    "Self review end must be after start time",
                  beforeManagerReview: (value) =>
                    !value ||
                    !managerReviewEndDate ||
                    dayjs(value).isBefore(dayjs(managerReviewEndDate)) ||
                    "Self review end must be before manager review end",
                },
              }}
              render={({ field }) => {
                return (
                  <DatePicker
                    value={dayjs(field.value)}
                    format="DD/MM/YYYY"
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                    slotProps={{ textField: { fullWidth: true } }}
                    shouldDisableDate={(date) =>
                      startDate
                        ? dayjs(date).isBefore(dayjs(), "day") ||
                          dayjs(date).isBefore(dayjs(startDate), "day") ||
                          dayjs(date).isSame(dayjs(startDate), "day")
                        : dayjs(date).isBefore(dayjs(), "day")
                    }
                  />
                );
              }}
            />
            <ErrorMessage errorMessage={errors.selfReviewEnd?.message} />
          </Field>

          {/* Manager Review End */}
          <Field className="flex flex-col gap-1">
            <Label className="label-form">Manager Review End</Label>
            <Controller
              control={control}
              name="managerReviewEnd"
              rules={{
                required: "This field is required",
                validate: {
                  afterSelfReview: (value) =>
                    !value ||
                    !selfReviewEndDate ||
                    dayjs(value).isAfter(dayjs(selfReviewEndDate)) ||
                    "Manager review end must be after self review end",
                  beforeEnd: (value) =>
                    !value ||
                    !endDate ||
                    dayjs(value).isBefore(dayjs(endDate)) ||
                    "Manager review end must be before end time",
                },
              }}
              render={({ field }) => {
                return (
                  <DatePicker
                    value={dayjs(field.value)}
                    format="DD/MM/YYYY"
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                    shouldDisableDate={(date) =>
                      selfReviewEndDate
                        ? dayjs(date).isBefore(dayjs(), "day") ||
                          dayjs(date).isBefore(
                            dayjs(selfReviewEndDate),
                            "day",
                          ) ||
                          dayjs(date).isSame(dayjs(selfReviewEndDate), "day")
                        : dayjs(date).isBefore(dayjs(), "day")
                    }
                  />
                );
              }}
            />
            <ErrorMessage errorMessage={errors.managerReviewEnd?.message} />
          </Field>

          {/* End Time */}
          <Field className="flex flex-col gap-1">
            <Label className="label-form">End Time</Label>
            <Controller
              control={control}
              name="end"
              rules={{
                required: "This field is required",
                validate: {
                  afterManagerReview: (value) =>
                    !value ||
                    !managerReviewEndDate ||
                    dayjs(value).isAfter(dayjs(managerReviewEndDate)) ||
                    "End time must be after manager review end",
                },
              }}
              render={({ field }) => {
                return (
                  <DatePicker
                    value={dayjs(field.value)}
                    format="DD/MM/YYYY"
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                    slotProps={{ textField: { fullWidth: true } }}
                    shouldDisableDate={(date) =>
                      managerReviewEndDate
                        ? dayjs(date).isBefore(dayjs(), "day") ||
                          dayjs(date).isBefore(
                            dayjs(managerReviewEndDate),
                            "day",
                          ) ||
                          dayjs(date).isSame(dayjs(managerReviewEndDate), "day")
                        : dayjs(date).isBefore(dayjs(), "day")
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
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <Button
          disabled={createAssessmentPeriodMutation?.isPending}
          onClick={handleSubmit(onSubmit)}
          className="button-primary"
        >
          {createAssessmentPeriodMutation.isPending ? "Creating..." : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCreateAssessmentPeriod;
