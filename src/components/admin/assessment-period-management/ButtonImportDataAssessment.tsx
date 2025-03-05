"use client";

import React from "react";
import * as XLSX from "xlsx";
import { formatDataImportListReviewer } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { importAssessmentPeriodData } from "@/apis/assessment";
import { IAssessmentPeriodImportData } from "@/types";
import {
  ArrowUpOnSquareIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

type Props = {
  assessmentPeriodId: number;
};

const ButtonImportDataAssessment = ({ assessmentPeriodId }: Props) => {
  const importAssessmentPeriodDataMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: IAssessmentPeriodImportData;
    }) => importAssessmentPeriodData(id, data),
  });
  async function handleFileAsync(e: React.ChangeEvent<HTMLInputElement>) {
    /* get first file */
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target?.result;
      const workbook = XLSX.read(data);

      /* DO SOMETHING WITH workbook HERE */
      const firstWorkSheet = workbook.Sheets[workbook.SheetNames[0]];
      const dataJson = XLSX.utils.sheet_to_json(firstWorkSheet, { header: 1 });
      const dataFormatted = formatDataImportListReviewer(dataJson);
      importAssessmentPeriodDataMutation.mutate({
        id: assessmentPeriodId,
        data: dataFormatted,
      });
    };

    // Read file
    if (file) {
      reader.readAsArrayBuffer(file);
    }
  }
  return (
    <label
      htmlFor={`import-excel-${assessmentPeriodId}`}
      className="flex cursor-pointer items-center justify-center rounded border border-black p-2"
    >
      <ArrowUpTrayIcon className="size-5" />
      <input
        type="file"
        className="h-0 w-0 opacity-0"
        id={`import-excel-${assessmentPeriodId}`}
        onChange={handleFileAsync}
      />
    </label>
  );
};

export default ButtonImportDataAssessment;
