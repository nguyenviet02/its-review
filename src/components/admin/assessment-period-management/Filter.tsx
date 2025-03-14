"use client";

import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "@headlessui/react";
import { useCreateAssessmentPeriodDialogStore } from "@/store";

const Filter = () => {
  const handleOpenCreateAssessmentPeriodDialog =
    useCreateAssessmentPeriodDialogStore((store) => store.openDialog);

  return (
    <div className="flex h-10 flex-1 justify-between gap-2">
      <div className="flex flex-1 items-center gap-2">
        {/* Search Input */}
        <div className="flex h-full w-full max-w-[300px] items-center gap-2 rounded border border-gray-700 p-1">
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
          />
          <input
            name="search"
            type="search"
            placeholder="Search"
            aria-label="Search"
            className="block size-full bg-white text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm/6"
          />
        </div>

        {/* <Select
          className="h-full w-full max-w-[200px] rounded border border-gray-700"
          defaultValue={""}
        >
          <option value="" disabled>
            Chọn kỳ đánh giá
          </option>
          <option value="active">Đang hoạt động</option>
          <option value="inactive">Ngừng hoạt động</option>
        </Select> */}
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={handleOpenCreateAssessmentPeriodDialog}
          className="button-primary"
        >
          Create Assessment Period
        </Button>
      </div>
    </div>
  );
};

export default Filter;
