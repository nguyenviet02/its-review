import { useReviewFormDialogStore } from "@/lib/zustand/reviewFormDialogStore";
import { FORM_TYPES, IPage, TFormReview } from "@/types";
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
import React, { useCallback, useMemo, useState } from "react";
import PageReview from "../common/PageReview";
import { FormProvider, useForm } from "react-hook-form";
import formReviewGeneral from "@/forms/form-review-general";
import formReviewBA from "@/forms/form-review-ba";
import formReviewDev from "@/forms/form-review-dev";
import formReviewTester from "@/forms/form-review-tester";
import { useDialogCongratulationStore } from "@/lib/zustand/dialogCongratulationStore";

// const data = {
//   "working-quality": "1",
//   "working-progress": "2",
//   "professional-skills": "3",
//   initiative: "4",
//   "teamwork-skills": "4",
//   "communication-skills": "",
//   "problem-solving-skills": "2",
//   "time-management-skills": "2",
//   discipline: "2",
//   participation: "2",
//   bonus: "1",
//   effort: "1",
//   "completed-works": [
//     {
//       value: "Công việc đã hoàn thành 1",
//     },
//     {
//       value: "Công việc đã hoàn thành 3",
//     },
//   ],
//   advantages: "5.1. Thuận lợi/Điểm mạnh\n",
//   disadvantages: "5.2. Khó khăn/Điểm yếu\n",
//   "other-suggestions": "Đề xuất\n",
//   "career-plan": [
//     {
//       id: "6c627aa3-1818-5f24-9522-2c10258665cc",
//       goal: "Mục tiêu phát triển",
//       suggestion: "Đề xuất",
//       estimatedTime: new Date("2025-02-05T17:00:00.000Z"),
//     },
//   ],
// };

const DialogFormReview = () => {
  const dialogState = useReviewFormDialogStore((store) => store.isOpen);
  const handleCloseReviewFormDialog = useReviewFormDialogStore(
    (store) => store.closeDialog,
  );
  const dialogCongratulationState = useDialogCongratulationStore(
    (store) => store,
  );
  const formType = useReviewFormDialogStore((store) => store.type);

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  //* TODO: Add default values for form fields
  const formMethods = useForm();
  const selectedForm: TFormReview = useMemo(() => {
    switch (formType) {
      case FORM_TYPES.FOR_BA:
        return formReviewBA;
        break;
      case FORM_TYPES.FOR_DEV:
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

  const numberOfPageInForm = useMemo(() => selectedForm.length, [selectedForm]);

  const onSubmit = useCallback(
    (data: any) => {
      console.log("☠️ ~ onSubmit ~ data:", data);
      handleCloseReviewFormDialog();
      formMethods.reset();
      setSelectedTabIndex(0);
      dialogCongratulationState.setTitle("Đánh giá nhân sự ngày 01/02/2025");
      dialogCongratulationState.setContent(
        "Cảm ơn bạn đã hoàn thành quá trình tự đánh giá nhân sự Chúc bạn sẽ đạt được kết quả tốt nhất",
      );
      dialogCongratulationState.openDialog();
    },
    [handleCloseReviewFormDialog, formMethods, dialogCongratulationState],
  );
  const renderButtonNextFooterDialog = useMemo(() => {
    if (selectedTabIndex >= numberOfPageInForm - 1) {
      return;
    }
    return (
      <Button
        onClick={() => {
          setSelectedTabIndex(selectedTabIndex + 1);
        }}
        className="rounded border border-black bg-black p-2 px-4 font-bold text-white"
      >
        Tiếp theo
      </Button>
    );
  }, [numberOfPageInForm, selectedTabIndex]);
  const renderButtonPrevFooterDialog = useMemo(() => {
    if (selectedTabIndex === 0 || selectedTabIndex >= numberOfPageInForm) {
      return;
    }
    return (
      <Button
        onClick={() => {
          setSelectedTabIndex(selectedTabIndex - 1);
        }}
        className="rounded border border-black bg-white p-2 px-4 font-bold text-black"
      >
        Quay lại
      </Button>
    );
  }, [numberOfPageInForm, selectedTabIndex]);
  const renderButtonSubmit = useMemo(() => {
    if (selectedTabIndex < numberOfPageInForm - 1) {
      return;
    }
    return (
      <Button
        onClick={formMethods.handleSubmit(onSubmit)}
        className="rounded bg-black p-2 px-4 font-bold text-white"
      >
        Hoàn thành
      </Button>
    );
  }, [formMethods, numberOfPageInForm, onSubmit, selectedTabIndex]);

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
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <TabGroup
              selectedIndex={selectedTabIndex}
              onChange={setSelectedTabIndex}
            >
              <TabList className="sticky right-0 top-0 z-10 flex w-full gap-4 bg-white pb-4">
                {selectedForm.map((page: IPage) => {
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
                {selectedForm.map((page: IPage) => {
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
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        {renderButtonPrevFooterDialog}
        {renderButtonNextFooterDialog}
        {renderButtonSubmit}
      </DialogActions>
    </Dialog>
  );
};

export default DialogFormReview;
