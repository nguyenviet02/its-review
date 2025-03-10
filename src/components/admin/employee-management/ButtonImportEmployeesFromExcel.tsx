"use client";

import { importListUser } from "@/apis/users";
import { IEmployee } from "@/types";
import { formatDataImportListEmployee } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import * as XLSX from "xlsx";
import Image from "next/image";
import { toast } from "react-toastify";

const ButtonImportEmployeesFromExcel = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const importListUserMutation = useMutation({
    mutationFn: (listUser: IEmployee[]) => importListUser(listUser),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users-listUser"],
        refetchType: "active",
      });
      toast.dismiss();
      toast.success("Import data successfully");
      if (inputRef.current) inputRef.current.value = ""; // Reset the input value
    },
    onError: (error) => {
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
      const dataJson = XLSX.utils.sheet_to_json(firstWorkSheet);
      const dataToImport = formatDataImportListEmployee(dataJson);
      importListUserMutation.mutate(dataToImport);
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
      {importListUserMutation?.isPending ? (
        <div className="flex items-center gap-2">
          <Image src="/loading.svg" alt="Loading" width={20} height={20} />
          Đang nhập, vui lòng đợi...
        </div>
      ) : (
        <span>Import from Excel</span>
      )}

      <input
        type="file"
        ref={inputRef}
        className="h-0 w-0 opacity-0"
        id="import-excel"
        onChange={handleFileAsync}
      />
    </label>
  );
};

export default ButtonImportEmployeesFromExcel;
