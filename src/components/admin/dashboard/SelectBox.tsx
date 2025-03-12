import { IAssessmentPeriodResponseAPI } from "@/types";
import { Select } from "@headlessui/react";
import React from "react";

type Props = {
  listAssessmentPeriod?: IAssessmentPeriodResponseAPI[];
  selectedAssessmentPeriodId: number | null;
  setSelectedAssessmentPeriodId: React.Dispatch<
    React.SetStateAction<number | null>
  >;
};

const SelectBox = ({
  listAssessmentPeriod,
  selectedAssessmentPeriodId,
  setSelectedAssessmentPeriodId,
}: Props) => {
  const handleChangeAssessmentPeriodId = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedId = Number(event.target.value);
    setSelectedAssessmentPeriodId(selectedId);
  };
  return (
    <div className="mt-2 w-full">
      <Select
        defaultValue={selectedAssessmentPeriodId || ""}
        name="status"
        aria-label="Project status"
        className="rounded-md border border-gray-200 px-4 py-2 text-lg font-semibold"
        onChange={handleChangeAssessmentPeriodId}
      >
        {listAssessmentPeriod?.map(
          (assessmentPeriod: IAssessmentPeriodResponseAPI) => (
            <option key={assessmentPeriod.id} value={assessmentPeriod.id}>
              {assessmentPeriod.title}
            </option>
          ),
        )}
      </Select>
    </div>
  );
};

export default SelectBox;
