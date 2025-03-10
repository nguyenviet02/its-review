import { ICriterion, IField } from "@/types";
import React, { useCallback, useMemo } from "react";
import FormField from "./FormField";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import CustomTooltip from "./CustomToolTip";
import { useForm, FormProvider } from "react-hook-form";
import { useDialogCongratulationStore } from "@/lib/zustand/dialogCongratulationStore";
import { useReviewFormDialogStore } from "@/lib/zustand/reviewFormDialogStore";
import { Button } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitDataFormReview } from "@/apis/assessment";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValues?: any;
  managerId?: string;
  fields: IField[];
};

const PageReview = ({ managerId, defaultValues, fields }: Props) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const session = useSession();
  const queryClient = useQueryClient();
  const defaultValuesFormatted = useMemo(() => {
    if (!defaultValues?.bonus) return defaultValues;
    const dataBonus = Object.entries(defaultValues.bonus).map(
      ([title, score]) => ({
        title,
        score,
      }),
    );
    return {
      ...defaultValues,
      bonus: dataBonus,
    };
  }, [defaultValues]);
  const formMethods = useForm({
    defaultValues: defaultValuesFormatted,
  });
  const handleCloseReviewFormDialog = useReviewFormDialogStore(
    (store) => store.closeDialog,
  );
  const formType = useReviewFormDialogStore((store) => store.type);
  const assessmentPeriodId = useReviewFormDialogStore(
    (store) => store.assessmentPeriodId,
  );
  const userId = useReviewFormDialogStore((store) => store.userId);
  const dialogCongratulationState = useDialogCongratulationStore(
    (store) => store,
  );
  const resetForm = useCallback(() => {
    setIsSubmitting(false);
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: any;
    }) => submitDataFormReview(assessmentPeriodId, userId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getDataFormReview"],
        refetchType: "active",
      });
      toast.dismiss();
      toast.success("Submit data successfully");
      resetForm();
      dialogCongratulationState.setTitle("Congratulation");
      dialogCongratulationState.setContent(
        "Thanks for your submission! Your review has been successfully submitted.",
      );
      dialogCongratulationState.openDialog();
    },
    onError: async (error) => {
      toast.dismiss();
      toast.error(`Error: ${error}`);
      setIsSubmitting(false);
    },
  });
  const onSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: any) => {
      setIsSubmitting(true);
      toast.loading("Submitting data...");
      const dataToSubmit = {
        ...data,
      };
      if (data.workPerformedAndAchievementsAchieved?.length > 0) {
        dataToSubmit.workPerformedAndAchievementsAchieved =
          data.workPerformedAndAchievementsAchieved.map(
            (item: { value: string }) => item.value,
          );
      }
      if (data?.bonus?.length > 0) {
        const dataBonus = data?.bonus?.map(
          (item: { title: string; score: number }) => ({
            [item.title]: item.score,
          }),
        );
        dataToSubmit.bonus = Object.assign({}, ...dataBonus);
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
    [assessmentPeriodId, formType, submitDataFormReviewMutation, userId],
  );

  const listFields = useMemo(() => {
    if (!!managerId) return fields;
    return fields.filter((field) => !!field?.isForManager === false);
  }, [fields, managerId]);

  const isAllowEditAndSubmit = useMemo(() => {
    return (
      session?.data?.user?.id === userId ||
      managerId === session?.data?.user?.id
    );
  }, [managerId, session?.data?.user?.id, userId]);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="relative">
        <div className="flex flex-col gap-4">
          {listFields.map((field: IField) => {
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
                        <FormField
                          disabled={!isAllowEditAndSubmit}
                          criterion={criterion}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        {isAllowEditAndSubmit && (
          <div className="sticky bottom-0 left-0 mt-4 flex w-full justify-center bg-white p-4">
            <Button
              onClick={formMethods.handleSubmit(onSubmit)}
              disabled={isSubmitting}
              type="submit"
              className="button-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Submit
            </Button>
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default PageReview;
