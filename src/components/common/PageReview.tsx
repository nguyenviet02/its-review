import { ICriterion, IField, IPlanData } from '@/types';
import React, { useCallback, useEffect, useMemo } from 'react';
import FormField from './FormField';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@headlessui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitDataFormReview } from '@/services/api';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { randomId } from '@mui/x-data-grid-generator';
import {
  useReviewFormDialogStore,
  useDialogCongratulationStore,
} from '@/store';
import CustomTooltip from '../ui/CustomTooltip';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValues?: any;
  managerId?: string;
  fields: IField[];
  isEmployeeSelfReview?: boolean;
};

const PageReview = ({
  managerId,
  defaultValues,
  fields,
  isEmployeeSelfReview,
}: Props) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const session = useSession();
  const queryClient = useQueryClient();
  const defaultValuesFormatted = useMemo(() => {
    if (defaultValues?.opinionAndSuggestions?.plans?.length > 0) {
      const dataPlans = defaultValues?.opinionAndSuggestions?.plans?.map(
        (plan: IPlanData) => {
          return {
            ...plan,
            estimatedTime: new Date(plan.estimatedTime),
            id: randomId(),
          };
        },
      );
      defaultValues.opinionAndSuggestions.plans = dataPlans;
    }
    return {
      ...defaultValues,
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
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: ['getDataFormReview'],
          type: 'active',
        }),
        queryClient.refetchQueries({
          queryKey: ['reviewEmployee-listEmployeeOfAssessmentPeriod'],
          type: 'active',
        }),
        queryClient.refetchQueries({
          queryKey: ['myListAssessmentPeriod'],
          type: 'active',
        }),
      ]);
      toast.dismiss();
      toast.success('Submit data successfully');
      resetForm();
      dialogCongratulationState.setTitle('Congratulation');
      dialogCongratulationState.setContent(
        'Thanks for your submission! Your review has been successfully submitted.',
      );
      dialogCongratulationState.openDialog();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: async (error: any) => {
      toast.dismiss();
      toast.error(
        <div>
          {error?.response?.data?.details?.map(
            (error: { property: string; code: string; message: string }) => (
              <div key={error.property} className="mb-2">
                {error.code}: {error.message}
              </div>
            ),
          ) ||
            error?.response?.data?.message ||
            'Submit data failed'}
        </div>,
      );
      setIsSubmitting(false);
    },
  });
  const onSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: any) => {
      setIsSubmitting(true);
      toast.loading('Submitting data...');
      const dataToSubmit = {
        ...data,
      };

      // Format data plans in form review ITS
      if (data?.opinionAndSuggestions?.plans?.length > 0) {
        // Remove field id from data
        const dataPlans = data?.opinionAndSuggestions?.plans.map(
          (plan: IPlanData) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id, ...rest } = plan;
            return rest;
          },
        );
        dataToSubmit.opinionAndSuggestions.plans = dataPlans;
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
    if (!!managerId)
      return fields.filter((field) => !!field?.notForManager === false);
    return fields.filter((field) => !!field?.isForManager === false);
  }, [fields, managerId]);

  const isAllowEditAndSubmit = useMemo(() => {
    return (
      session?.data?.user?.id === userId ||
      (managerId === session?.data?.user?.id && isEmployeeSelfReview)
    );
  }, [managerId, session?.data?.user?.id, userId, isEmployeeSelfReview]);

  // Show manager review notification when viewing as manager and employee has submitted a self-review
  const showManagerReviewNotice =
    managerId && managerId === session?.data?.user?.id && !isEmployeeSelfReview;

  useEffect(() => {
    if (!defaultValues) return;
    formMethods.reset(defaultValues);
  }, [defaultValues, fields, formMethods]);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="relative">
        {showManagerReviewNotice && (
          <div className="mb-4 rounded-lg bg-blue-50 p-4 text-blue-800 shadow">
            <h3 className="mb-1 font-medium">Employee Self Review Required</h3>
            <p className="text-sm">
              You are reviewing this employee as a manager. But the employee has
              not submitted a self-review yet. Please ask the employee to submit
              a self-review first.
            </p>
          </div>
        )}
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
