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
import { useEmployeeDialogSummaryInfoStore } from "@/lib/zustand/employeeDialogSummaryInfoStore";
import { useQuery } from "@tanstack/react-query";
import {
  getDataFormReview,
  getListReviewerOfEmployee,
} from "@/apis/assessment";
import Loading from "../common/Loading";

const DialogFormReview = () => {
  const isOpenReviewFormDialog = useReviewFormDialogStore(
    (store) => store.isOpen,
  );
  const summaryInfoStore = useEmployeeDialogSummaryInfoStore(
    (store) => store.dialogState,
  );
  const handleCloseReviewFormDialog = useReviewFormDialogStore(
    (store) => store.closeDialog,
  );

  const userId = useReviewFormDialogStore((store) => store.userId);
  console.log("☠️ ~ DialogFormReview ~ userId:", userId);
  const assessmentPeriodId = useReviewFormDialogStore(
    (store) => store.assessmentPeriodId,
  );
  const isManager = useReviewFormDialogStore((store) => store.isManager);
  console.log("☠️ ~ DialogFormReview ~ isManager:", isManager);
  const formType = useReviewFormDialogStore((store) => store.type);
  console.log("☠️ ~ DialogFormReview ~ formType:", formType);

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  //* TODO: Add default values for form fields
  const formMethods = useForm();
  const selectedForm: TFormReview = useMemo(() => {
    switch (formType) {
      case FORM_TYPES.FOR_BA:
        return formReviewBA;
        break;
      case FORM_TYPES.FOR_DEV_V1:
      case FORM_TYPES.FOR_DEV_MANAGER_V1:
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
    queryKey: [
      "getDataFormReview",
      userId,
      assessmentPeriodId,
      isOpenReviewFormDialog,
    ],
    queryFn: async () =>
      getDataFormReview(assessmentPeriodId as number, userId as string),
    refetchOnWindowFocus: false,
    enabled: !!userId && !!assessmentPeriodId,
  });

  const getListReviewerQuery = useQuery({
    queryKey: ["getListReviewerOfEmployee", userId, assessmentPeriodId],
    queryFn: async () =>
      getListReviewerOfEmployee(assessmentPeriodId as number, userId as string),
    refetchOnWindowFocus: false,
    enabled: !!userId && !!assessmentPeriodId && isManager,
  });
  const listReviewer = getListReviewerQuery?.data?.data;

  const renderTotalPoint = (point: number, maxPoint: number) => {
    if (!point || !maxPoint) return null;
    return (
      <div className="flex h-10 w-full items-center justify-center bg-white py-4 text-2xl font-bold">
        <span>
          Total Point: {point}/{maxPoint}
        </span>
      </div>
    );
  };

  return (
    <Dialog
      open={isOpenReviewFormDialog}
      onClose={() => null}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xl"
      sx={{
        "& .MuiDialogContent-root": {
          paddingBottom: 0,
        },
      }}
    >
      <DialogTitle id="alert-dialog-title" className="text-3xl font-bold">
        Assessment Form
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
        <Loading
          isLoading={
            getDataFormReviewQuery.isLoading || getListReviewerQuery.isLoading
          }
        >
          <TabGroup
            selectedIndex={selectedTabIndex}
            onChange={setSelectedTabIndex}
          >
            <TabList className="sticky right-0 top-0 z-10 flex w-full gap-4 bg-white pb-4">
              <Tab className="rounded-full border border-transparent px-3 py-1 text-sm/6 font-semibold text-black hover:border-gray-200 focus:outline-none data-[hover]:bg-white/5 data-[selected]:bg-black data-[selected]:text-white">
                Self Review
              </Tab>
              {listReviewer?.map((reviewer) => {
                return (
                  <Tab
                    key={reviewer?.id}
                    className="rounded-full border border-transparent px-3 py-1 text-sm/6 font-semibold text-black hover:border-gray-200 focus:outline-none data-[hover]:bg-white/5 data-[selected]:bg-black data-[selected]:text-white"
                  >
                    {reviewer?.username}
                  </Tab>
                );
              })}
            </TabList>
            <TabPanels className="relative mt-3">
              <TabPanel className="relative rounded-xl bg-white/5 p-3 pb-6">
                {renderTotalPoint(
                  getDataFormReviewQuery?.data?.selfReview?.point,
                  getDataFormReviewQuery?.data?.selfReview?.maxPoint,
                )}
                <PageReview
                  defaultValues={getDataFormReviewQuery?.data?.selfReview}
                  fields={selectedForm}
                />
              </TabPanel>
              {listReviewer?.map((reviewer) => {
                const defaultValues =
                  getDataFormReviewQuery?.data?.managerReviews?.find(
                    (data) => data?.managerId === reviewer?.id,
                  );

                return (
                  <TabPanel
                    key={reviewer?.id}
                    className="rounded-xl bg-white/5 p-3 pb-4"
                  >
                    {renderTotalPoint(
                      defaultValues?.point,
                      defaultValues?.maxPoint,
                    )}
                    <PageReview
                      defaultValues={defaultValues || {}}
                      managerId={reviewer?.id}
                      fields={selectedForm}
                    />
                  </TabPanel>
                );
              })}
            </TabPanels>
          </TabGroup>
        </Loading>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFormReview;
