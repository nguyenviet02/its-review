import { exportDataAssessmentPeriodById } from "@/apis/assessment";
import { Button } from "@headlessui/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import React from "react";

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
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${assessmentPeriodTitle}.xlsx`);
      document.body.appendChild(link);
      link.click();
    },
  });
  const handleExport = async () => {
    console.log(
      "☠️ ~ ButtonExportDataAssessment ~ assessmentPeriodId:",
      assessmentPeriodId,
    );
    await exportDataAssessmentMutation.mutateAsync();
  };
  return (
    <Button
      type="button"
      className="flex cursor-pointer items-center justify-center rounded border border-black p-2"
      onClick={handleExport}
    >
      <ArrowDownTrayIcon className="size-5" />
    </Button>
  );
};

export default ButtonExportDataAssessment;
