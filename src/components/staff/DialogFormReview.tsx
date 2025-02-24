import formReviewGeneral from "@/forms/form-review-general";
import { useReviewFormDialogStore } from "@/lib/zustand/reviewFormDialogStore";
import { IPage } from "@/types";
import {
  Button,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React from "react";
import PageReview from "../common/PageReview";
import { FormProvider, useForm } from "react-hook-form";

const DialogFormReview = () => {
  const dialogState = useReviewFormDialogStore((store) => store.isOpen);
  const handleClose = useReviewFormDialogStore((store) => store.closeDialog);

	//* TODO: Add default values for form fields
  const formMethods = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <Dialog
      open={dialogState}
      onClose={() => null}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="alert-dialog-title" className="text-3xl font-bold">
        Bảng tự đánh giá nhân sự ngày 01/02/2025
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => {
          formMethods.reset();
          handleClose();
        }}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <XMarkIcon className="size-6 text-black" />
      </IconButton>
      <DialogContent className="relative" sx={{ paddingTop: 0 }}>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <TabGroup>
              <TabList className="sticky right-0 top-0 z-10 flex w-full gap-4 bg-white pb-4">
                {formReviewGeneral.map((page: IPage) => {
                  return (
                    <Tab
                      key={page.id}
                      className="rounded-full border border-transparent px-3 py-1 text-sm/6 font-semibold text-black hover:border-gray-200 focus:outline-none data-[hover]:bg-white/5 data-[selected]:bg-black data-[selected]:text-white"
                    >
                      Page {page.id}
                    </Tab>
                  );
                })}
              </TabList>
              <TabPanels className="mt-3">
                {formReviewGeneral.map((page: IPage) => {
                  return (
                    <TabPanel
                      key={page.id}
                      className="rounded-xl bg-white/5 p-3"
                    >
                      <PageReview fields={page.fields} />
                    </TabPanel>
                  );
                })}
              </TabPanels>
            </TabGroup>
          </form>
        </FormProvider>
      </DialogContent>``
      <DialogActions
        sx={{
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <Button
          onClick={formMethods.handleSubmit(onSubmit)}
          className="rounded bg-black p-2 px-4 font-bold text-white"
        >
          Hoàn thành
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogFormReview;
