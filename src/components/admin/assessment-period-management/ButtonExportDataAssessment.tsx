import { exportDataAssessmentPeriodById } from '@/services/api';
import { Button } from '@headlessui/react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';

type Props = {
  assessmentPeriodId: number;
  assessmentPeriodTitle: string;
};

const ButtonExportDataAssessment = ({
  assessmentPeriodId,
  assessmentPeriodTitle,
}: Props) => {
  const exportDataAssessmentMutation = useMutation({
    mutationFn: () => exportDataAssessmentPeriodById(assessmentPeriodId),
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${assessmentPeriodTitle}.xlsx`);
      document.body.appendChild(link);
      link.click();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Export data failed');
    },
  });
  const handleExport = async () => {
    await exportDataAssessmentMutation.mutateAsync();
  };
  return (
    <Button
      type="button"
      className="bg-primary flex cursor-pointer items-center justify-center gap-2 rounded-md"
      onClick={handleExport}
    >
      <ArrowDownTrayIcon className="size-5" />
      Export Data
    </Button>
  );
};

export default ButtonExportDataAssessment;
