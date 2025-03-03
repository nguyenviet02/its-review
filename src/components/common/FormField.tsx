import { FORM_FIELDS, ICriterion } from "@/types";
import React from "react";
import MultiInput from "./fields/MultiInput";
import SelectField from "./fields/SelectField";
import ScoreInput from "./fields/ScoreInput";
import TextArea from "./fields/TextArea";
import TableInput from "./fields/TableInput";
import CustomTooltip from "./CustomToolTip";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  criterion: ICriterion;
};

const FormField = ({ criterion }: Props) => {
  if (criterion.type === FORM_FIELDS.MULTI_INPUT) {
    return <MultiInput name={criterion.name} />;
  }
  if (criterion.type === FORM_FIELDS.SELECT) {
    return (
      <>
        <h3 className="flex items-center gap-1 font-semibold">
          {`${criterion.number}. ${criterion.title}`}
          {criterion?.description && (
            <CustomTooltip
              title={
                <div className="size-full max-h-[500px] overflow-auto">
                  <pre className="mb-2 text-wrap pr-4 text-sm font-normal opacity-80">
                    {criterion.description}
                  </pre>
                </div>
              }
              arrow
            >
              <QuestionMarkCircleIcon className="inline size-4 text-black" />
            </CustomTooltip>
          )}
        </h3>
        <SelectField name={criterion.name} scoreScale={criterion.scoreScale} />
      </>
    );
  }
  if (criterion.type === FORM_FIELDS.SCORE_INPUT) {
    return <ScoreInput name={criterion.name} title={criterion.title} />;
  }
  if (criterion.type === FORM_FIELDS.TEXTAREA) {
    return (
      <>
        <h3 className="font-semibold">{`${criterion.number}. ${criterion.title}`}</h3>
        <TextArea name={criterion.name} />
      </>
    );
  }
  if (criterion.type === FORM_FIELDS.TABLE) {
    return (
      <>
        <h3 className="font-semibold">{`${criterion.number}. ${criterion.title}`}</h3>
        <TableInput name={criterion.name} />
      </>
    );
  }
  return <div>FormField</div>;
};

export default FormField;
