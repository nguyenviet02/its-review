"use client";

import { IStaff } from "@/types";
import { formatDataImportListStaff } from "@/utils";
import React from "react";
import * as XLSX from "xlsx";

const ButtonImportStaffsFromExcel = () => {
  async function handleFileAsync(e: React.ChangeEvent<HTMLInputElement>) {
    /* get first file */
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target?.result;
      const workbook = XLSX.read(data);

      /* DO SOMETHING WITH workbook HERE */
      const firstWorkSheet = workbook.Sheets[workbook.SheetNames[0]];
      const dataJson = XLSX.utils.sheet_to_json(firstWorkSheet);
      console.log(
        "☠️ ~ handleFileAsync ~ dataJson:",
        formatDataImportListStaff(dataJson),
      );
    };

    // Read file
    if (file) {
      reader.readAsArrayBuffer(file);
    }
  }
  return (
    <label
      htmlFor="import-excel"
      className="flex h-full cursor-pointer items-center justify-center rounded border border-black p-2"
    >
      Nhập từ Excel
      <input
        type="file"
        className="h-0 w-0 opacity-0"
        id="import-excel"
        onChange={handleFileAsync}
      />
    </label>
  );
};

export default ButtonImportStaffsFromExcel;
