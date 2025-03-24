"use client";

import React from "react";
import * as XLSX from "xlsx";
import { formatDataImportListManager } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { importAssessmentPeriodData } from "@/services/api";
import { IAssessmentPeriodImportData } from "@/types";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

type Props = {
  assessmentPeriodId: number;
};

const ButtonImportDataAssessment = ({ assessmentPeriodId }: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const importAssessmentPeriodDataMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: IAssessmentPeriodImportData;
    }) => importAssessmentPeriodData(id, data),
    onSuccess: () => {
      toast.dismiss();
      toast.success("Import data successfully");
      if (inputRef.current) inputRef.current.value = ""; // Reset the input value
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.dismiss();
      toast.error(error?.response?.data?.message || "Import data failed");
      if (inputRef.current) inputRef.current.value = ""; // Reset the input value
    },
  });
  async function handleFileAsync(e: React.ChangeEvent<HTMLInputElement>) {
    /* get first file */
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      toast.loading("Importing data...");
      const data = e.target?.result;
      const workbook = XLSX.read(data);

      /* DO SOMETHING WITH workbook HERE */
      const firstWorkSheet = workbook.Sheets[workbook.SheetNames[0]];
      const dataJson = XLSX.utils.sheet_to_json(firstWorkSheet, { header: 1 });
      const dataFormatted = formatDataImportListManager(dataJson);
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
      className="bg-primary flex cursor-pointer items-center justify-center gap-2 rounded-md"
    >
      <ArrowUpTrayIcon className="size-5" />
      <input
        type="file"
        ref={inputRef}
        className="h-0 w-0 opacity-0 hidden"
        id={`import-excel-${assessmentPeriodId}`}
        onChange={handleFileAsync}
      />
      Import Data
    </label>
  );
};

export default ButtonImportDataAssessment;
