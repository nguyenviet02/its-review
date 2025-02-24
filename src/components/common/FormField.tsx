import { FORM_FIELDS, ICriterion } from "@/types";
import React from "react";
import MultiInput from "./fields/MultiInput";
import SelectField from "./fields/SelectField";
import ScoreInput from "./fields/ScoreInput";
import TextArea from "./fields/TextArea";

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
        <h3>{`${criterion.number}. ${criterion.title}`}</h3>
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
        <h3>{`${criterion.number}. ${criterion.title}`}</h3>
        <TextArea name={criterion.name} />
      </>
    );
  }
  return <div>FormField</div>;
};

export default FormField;
