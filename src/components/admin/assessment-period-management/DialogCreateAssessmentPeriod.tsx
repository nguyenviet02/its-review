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
import dayjs, { Dayjs } from "dayjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAssessmentPeriod } from "@/apis/assessment";
import { toast } from "react-toastify";

type Props = {};

const DialogCreateAssessmentPeriod = (props: Props) => {
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
      toast.success("Tạo mới kỳ đánh giá thành công");
      queryClient.invalidateQueries({
        queryKey: ["organization-listAssessmentPeriod"],
        refetchType: "active",
      });
      handleClose();
    },
    onError: (error) => {
      toast.dismiss();
      toast.error("Tạo mới kỳ đánh giá thất bại");
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
    toast.loading("Đang tạo mới kỳ đánh giá");
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
        Tạo mới kỳ đánh giá
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
            <Label className="label-form">Tên kỳ đánh giá</Label>
            <Input
              className="input-form"
              {...register("title", {
                required: "Trường này không được để trống",
              })}
            />
            <ErrorMessage errorMessage={errors.title?.message} />
          </Field>
          <Field className="flex flex-col gap-1">
            <Label className="label-form">Thời gian bắt đầu</Label>
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
            <Label className="label-form">Thời gian kết thúc</Label>
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
          {createAssessmentPeriodMutation.isPending
            ? "Đang tạo mới kỳ đánh giá"
            : "Tạo mới kỳ đánh giá"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCreateAssessmentPeriod;
