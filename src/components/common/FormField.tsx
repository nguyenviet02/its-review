import { FORM_FIELDS, ICriterion } from "@/types";
import React from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import MultiInput from "../forms/fields/MultiInput";
import MultiInputScore from "../forms/fields/MultiInputScore";
import ScoreInput from "../forms/fields/ScoreInput";
import SelectField from "../forms/fields/SelectField";
import TableInput from "../forms/fields/TableInput";
import CustomTooltip from "../ui/CustomTooltip";
import TextAreaField from "../forms/fields/TextAreaField";

type Props = {
  disabled?: boolean;
  criterion: ICriterion;
};

const FormField = ({ disabled, criterion }: Props) => {
  if (criterion.type === FORM_FIELDS.MULTI_INPUT) {
    return <MultiInput disabled={disabled} name={criterion.name} />;
  }
  if (criterion.type === FORM_FIELDS.MULTI_INPUT_SCORE) {
    return <MultiInputScore disabled={disabled} name={criterion.name} />;
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
        <SelectField
          disabled={disabled}
          name={criterion.name}
          scoreScale={criterion.scoreScale}
          isRequired={criterion?.isRequired}
        />
      </>
    );
  }
  if (criterion.type === FORM_FIELDS.SCORE_INPUT) {
    return (
      <ScoreInput
        disabled={disabled}
        name={criterion.name}
        title={criterion.title}
      />
    );
  }
  if (criterion.type === FORM_FIELDS.TEXTAREA) {
    return (
      <>
        {!!criterion.title && (
          <h3 className="font-semibold">{`${criterion.number}. ${criterion.title}`}</h3>
        )}
        <TextAreaField
          disabled={disabled}
          name={criterion.name}
          isRequired={criterion?.isRequired}
        />
      </>
    );
  }
  if (criterion.type === FORM_FIELDS.TABLE) {
    return (
      <>
        <h3 className="font-semibold">{`${criterion.number}. ${criterion.title}`}</h3>
        <TableInput disabled={disabled} name={criterion.name} />
      </>
    );
  }
  return <div>FormField</div>;
};

export default FormField;
