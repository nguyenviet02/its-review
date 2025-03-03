import { ICriterion, IField } from "@/types";
import React, { useCallback } from "react";
import FormField from "./FormField";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import CustomTooltip from "./CustomToolTip";
import { useForm, FormProvider } from "react-hook-form";
import { useDialogCongratulationStore } from "@/lib/zustand/dialogCongratulationStore";
import { useReviewFormDialogStore } from "@/lib/zustand/reviewFormDialogStore";
import { Button } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { submitDataFormReview } from "@/apis/assessment";

type Props = {
	defaultValues?: any;
  fields: IField[];
};

const PageReview = ({defaultValues, fields }: Props) => {
  const formMethods = useForm({
		defaultValues,
	});
  const handleCloseReviewFormDialog = useReviewFormDialogStore(
    (store) => store.closeDialog,
  );
  const formType = useReviewFormDialogStore((store) => store.type);
  const assessmentPeriodId = useReviewFormDialogStore(
    (store) => store.assessmentPeriodId,
  );
  const userId = useReviewFormDialogStore(
    (store) => store.userId,
  );
  const dialogCongratulationState = useDialogCongratulationStore(
    (store) => store,
  );
  const resetForm = useCallback(() => {
    handleCloseReviewFormDialog();
    formMethods.reset();
  }, [formMethods, handleCloseReviewFormDialog]);
  const submitDataFormReviewMutation = useMutation({
    mutationFn: ({
      assessmentPeriodId,
      userId,
      data,
    }: {
      assessmentPeriodId: number;
      userId: string;
      data: any;
    }) => submitDataFormReview(assessmentPeriodId, userId, data),
    onSuccess: () => {
      resetForm();
      dialogCongratulationState.setTitle("Đánh giá nhân sự ngày 01/02/2025");
      dialogCongratulationState.setContent(
        "Cảm ơn bạn đã hoàn thành quá trình tự đánh giá nhân sự Chúc bạn sẽ đạt được kết quả tốt nhất",
      );
      dialogCongratulationState.openDialog();
    },
  });
  const onSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: any) => {
      const dataToSubmit = {
        ...data,
      };
      if (data.workPerformedAndAchievementsAchieved?.length > 0) {
        dataToSubmit.workPerformedAndAchievementsAchieved =
          data.workPerformedAndAchievementsAchieved.map(
            (item: { value: string }) => item.value,
          );
      }
      const payload = {
        review: {
					...dataToSubmit,
					__type: formType,
				},
      };
      submitDataFormReviewMutation.mutate({
        assessmentPeriodId: assessmentPeriodId as number,
        userId: userId as string,
        data: payload,
      });
    },
    [handleCloseReviewFormDialog, formMethods, dialogCongratulationState],
  );
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="relative">
        <div className="flex flex-col gap-4">
          {fields.map((field: IField) => {
            return (
              <div key={field.number}>
                <h2 className="mb-1 flex items-center gap-2 text-xl font-bold">
                  {`${field.number}. ${field.title}`}
                  {field?.description && (
                    <CustomTooltip
                      title={
                        <div className="size-full max-h-[500px] overflow-auto">
                          <pre className="mb-2 text-wrap pr-4 text-sm font-normal opacity-80">
                            {field.description}
                          </pre>
                        </div>
                      }
                      arrow
                    >
                      <QuestionMarkCircleIcon className="inline size-5 font-bold text-black" />
                    </CustomTooltip>
                  )}
                </h2>
                <div className="flex w-full flex-col gap-2">
                  {field.criterions.map((criterion: ICriterion) => {
                    return (
                      <div
                        key={criterion.number}
                        className="flex flex-col gap-2"
                      >
                        <FormField criterion={criterion} />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="sticky bottom-0 left-0 mt-4 flex w-full justify-center bg-white p-4">
          <Button
            onClick={formMethods.handleSubmit(onSubmit)}
            type="submit"
            className="button-primary"
          >
            Hoàn thành
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default PageReview;
