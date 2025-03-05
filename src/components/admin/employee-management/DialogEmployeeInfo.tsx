"use client";

import DataReviewTable from "@/components/common/DataReviewTable";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useDialogEmployeeInfoStore } from "@/lib/zustand/dialogEmployeeInfoStore";
import { FORM_STATUS, IAssessmentMinifyData, IEmployee, JOB_POSITIONS } from "@/types";
import {
  Field,
  Label,
  Input,
  Button,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  IconButton,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const data: IAssessmentMinifyData[] = [
  {
    id: "1",
    username: "Nguyễn Văn A",
    department: "Phòng Kinh doanh",
    jobPosition: JOB_POSITIONS.DEV,
    currentStatus: FORM_STATUS.WAITING_FILL_FORM,
    period: "2023-2024",
    deadline: "2024-01-01",
  },
  {
    id: "2",
    username: "Nguyễn Văn B",
    department: "Phòng Kinh doanh",
    jobPosition: JOB_POSITIONS.DEV,
    currentStatus: FORM_STATUS.WAITING_BO,
    period: "2023-2024",
    deadline: "2024-01-01",
  },
];

const DialogEmployeeInfo = () => {
  const dialogState = useDialogEmployeeInfoStore((store) => store.isOpen);
  const handleClose = useDialogEmployeeInfoStore((store) => store.closeDialog);
  const employeeInfo = useDialogEmployeeInfoStore((store) => store.employeeInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmployee>({
    defaultValues: employeeInfo,
    values: employeeInfo,
  });
  const handleSubmitChangeEmployeeInfo: SubmitHandler<IEmployee> = (
    data: IEmployee,
  ) => {
    console.log(data);
  };

  return (
    <Dialog
      open={dialogState}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle id="alert-dialog-title" className="text-3xl font-bold">
        Chi tiết nhân sự
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
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleSubmitChangeEmployeeInfo)}
        >
          <Field disabled className="flex flex-col gap-1">
            <Label className="text-xl font-bold">ID Cá nhân:</Label>
            <Input
              className="rounded border border-black px-2 py-3"
              {...register("id", {
                required: "Trường này không được để trống",
              })}
            />
            <ErrorMessage errorMessage={errors.username?.message} />
          </Field>
          <Field disabled className="flex flex-col gap-1">
            <Label className="text-xl font-bold">Họ tên</Label>
            <Input
              className="rounded border border-black px-2 py-3"
              {...register("username", {
                required: "Trường này không được để trống",
              })}
            />
            <ErrorMessage errorMessage={errors.username?.message} />
          </Field>
          <Field disabled className="flex flex-col gap-1">
            <Label className="text-xl font-bold">Email</Label>
            <Input
              className="rounded border border-black px-2 py-3"
              {...register("email", {
                required: "Trường này không được để trống",
              })}
            />
            <ErrorMessage errorMessage={errors.username?.message} />
          </Field>
          <div className="flex items-center gap-4">
            <Field disabled className="flex flex-1 flex-col gap-1">
              <Label className="text-xl font-bold">Phòng ban</Label>
              <Input
                className="rounded border border-black px-2 py-3"
                {...register("department", {
                  required: "Trường này không được để trống",
                })}
              />
              <ErrorMessage errorMessage={errors.username?.message} />
            </Field>
            <Field disabled className="flex flex-1 flex-col gap-1">
              <Label className="text-xl font-bold">Vị trí</Label>
              <Input
                className="rounded border border-black px-2 py-3"
                {...register("jobPosition", {
                  required: "Trường này không được để trống",
                })}
              />
              <ErrorMessage errorMessage={errors.username?.message} />
            </Field>
          </div>
        </form>
        <TabGroup>
          <TabList className="mb-2 flex gap-4">
            <Tab className="border-b border-transparent font-bold text-[#14142B] opacity-50 data-[selected]:border-b-black data-[selected]:text-black data-[selected]:opacity-100">
              Tab 1
            </Tab>
            <Tab className="border-b border-transparent font-bold text-[#14142B] opacity-50 data-[selected]:border-b-black data-[selected]:text-black data-[selected]:opacity-100">
              Tab 2
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DataReviewTable data={data} />
            </TabPanel>
            <TabPanel>
              <DataReviewTable data={data} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <Button
          onClick={handleClose}
          className="button-primary"
        >
          Xuất thông tin nhân sự
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogEmployeeInfo;
