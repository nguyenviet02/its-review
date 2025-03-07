import ErrorMessage from "@/components/common/ErrorMessage";
import { useCreateAssessmentPeriodDialogStore } from "@/lib/zustand/dialogCreateAssessmentPeriodStore";
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
import { createAssessmentPeriod } from "@/apis/assessment";
import { toast } from "react-toastify";

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
      console.log('☠️ ~ DialogCreateAssessmentPeriod ~ error:', error)
      toast.dismiss();
      toast.error("Create new assessment period failed");
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAssessmentPeriod>({
    defaultValues: {
      title: "",
      start: null as Date | null,
      end: null as Date | null,
    },
  });

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
        <form>
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
          <Field className="flex flex-col gap-1">
            <Label className="label-form">Start Time</Label>
            <Controller
              control={control}
              name="start"
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <DatePicker
                    value={dayjs(field.value)}
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                );
              }}
            />
            <ErrorMessage errorMessage={errors.start?.message} />
          </Field>
          <Field className="flex flex-col gap-1">
            <Label className="label-form">End Time</Label>
            <Controller
              control={control}
              name="end"
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <DatePicker
                    value={dayjs(field.value)}
                    onChange={(date) => {
                      field.onChange(date);
                    }}
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
        <Button onClick={handleSubmit(onSubmit)} className="button-primary">
          {createAssessmentPeriodMutation.isPending ? "Creating..." : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCreateAssessmentPeriod;
