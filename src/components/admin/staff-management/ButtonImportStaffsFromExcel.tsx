"use client";

import { importListUser } from "@/apis/users";
import { IStaff } from "@/types";
import { formatDataImportListStaff } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import * as XLSX from "xlsx";
import Image from "next/image";

const ButtonImportStaffsFromExcel = () => {
  const queryClient = useQueryClient();
  const importListUserMutation = useMutation({
    mutationFn: (listUser: IStaff[]) => importListUser(listUser),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users-listUser"],
        refetchType: "active",
      });
    },
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
      const dataJson = XLSX.utils.sheet_to_json(firstWorkSheet);
      const dataToImport = formatDataImportListStaff(dataJson);
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
        <span>Nhập từ Excel</span>
      )}

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
