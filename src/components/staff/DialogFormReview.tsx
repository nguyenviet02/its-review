import { useReviewFormDialogStore } from "@/lib/zustand/reviewFormDialogStore";
import { FORM_TYPES, TFormReview } from "@/types";
import {
  Button,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { DialogContent, Dialog, DialogTitle, IconButton } from "@mui/material";
import React, { useMemo, useState } from "react";
import PageReview from "../common/PageReview";
import { useForm } from "react-hook-form";
import formReviewGeneral from "@/forms/form-review-general";
import formReviewBA from "@/forms/form-review-ba";
import formReviewDev from "@/forms/form-review-dev";
import formReviewTester from "@/forms/form-review-tester";
import { useStaffDialogSummaryInfoStore } from "@/lib/zustand/staffDialogSummaryInfoStore";
import { useQuery } from "@tanstack/react-query";
import { getDataFormReview } from "@/apis/assessment";
import Loading from "../common/Loading";

const DialogFormReview = () => {
  const isOpenReviewFormDialog = useReviewFormDialogStore(
    (store) => store.isOpen,
  );
  const summaryInfoStore = useStaffDialogSummaryInfoStore(
    (store) => store.dialogState,
  );
  const handleCloseReviewFormDialog = useReviewFormDialogStore(
    (store) => store.closeDialog,
  );

  const userId = useReviewFormDialogStore((store) => store.userId);
  const assessmentPeriodId = useReviewFormDialogStore(
    (store) => store.assessmentPeriodId,
  );
  const isManager = useReviewFormDialogStore((store) => store.isManager);
  console.log("☠️ ~ DialogFormReview ~ isManager:", isManager);
  const formType = useReviewFormDialogStore((store) => store.type);

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  //* TODO: Add default values for form fields
  const formMethods = useForm();
  const selectedForm: TFormReview = useMemo(() => {
    switch (formType) {
      case FORM_TYPES.FOR_BA:
        return formReviewBA;
        break;
      case FORM_TYPES.FOR_DEV_V1:
        return formReviewDev;
        break;
      case FORM_TYPES.FOR_TESTER:
        return formReviewTester;
        break;
      default:
        return formReviewGeneral;
        break;
    }
  }, [formType]);

  const getDataFormReviewQuery = useQuery({
    queryKey: ["getDataFormReview", userId, assessmentPeriodId],
    queryFn: async () =>
      getDataFormReview(assessmentPeriodId as number, userId as string),
    refetchOnWindowFocus: false,
    enabled: !!userId && !!assessmentPeriodId,
  });

  return (
    <Dialog
      open={isOpenReviewFormDialog}
      onClose={() => null}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="md"
      sx={{
        "& .MuiDialogContent-root": {
          paddingBottom: 0,
        },
      }}
    >
      <DialogTitle id="alert-dialog-title" className="text-3xl font-bold">
        Bảng đánh giá nhân sự
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => {
          handleCloseReviewFormDialog();
          formMethods.reset();
          setSelectedTabIndex(0);
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
        <Loading isLoading={getDataFormReviewQuery.isLoading}>
          <TabGroup
            selectedIndex={selectedTabIndex}
            onChange={setSelectedTabIndex}
          >
            <TabList className="sticky right-0 top-0 z-10 flex w-full gap-4 bg-white pb-4">
              <Tab className="rounded-full border border-transparent px-3 py-1 text-sm/6 font-semibold text-black hover:border-gray-200 focus:outline-none data-[hover]:bg-white/5 data-[selected]:bg-black data-[selected]:text-white">
                Tự đánh giá
              </Tab>
              {formType === FORM_TYPES.FOR_DEV_MANAGER_V1 && (
                <>
                  {[1, 2].map((page, index) => {
                    return (
                      <Tab
                        key={index}
                        className="rounded-full border border-transparent px-3 py-1 text-sm/6 font-semibold text-black hover:border-gray-200 focus:outline-none data-[hover]:bg-white/5 data-[selected]:bg-black data-[selected]:text-white"
                      >
                        Page {index + 1}
                      </Tab>
                    );
                  })}
                </>
              )}
            </TabList>
            <TabPanels className="mt-3">
              <TabPanel className="rounded-xl bg-white/5 p-3 pb-0">
                <PageReview
                  defaultValues={getDataFormReviewQuery?.data?.selfReview}
                  fields={selectedForm}
                />
              </TabPanel>
              {formType === FORM_TYPES.FOR_DEV_MANAGER_V1 && (
                <>
                  {[1, 2].map((page, index) => {
                    return (
                      <TabPanel
                        key={index}
                        className="rounded-xl bg-white/5 p-3 pb-0"
                      >
                        <PageReview fields={selectedForm} />
                      </TabPanel>
                    );
                  })}
                </>
              )}
            </TabPanels>
          </TabGroup>
        </Loading>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFormReview;
