import { FORM_FIELDS, ScoreScale } from "@/types";
import React from "react";
import MultiInput from "./fields/MultiInput";
import SelectField from "./fields/SelectField";

type Props = {
  name: string;
  type: FORM_FIELDS;
  scoreScale?: ScoreScale[];
};

const FormField = ({ name, type, scoreScale }: Props) => {
  if (type === FORM_FIELDS.MULTI_INPUT) {
    return <MultiInput name={name} />;
  }
  if (type === FORM_FIELDS.SELECT) {
    return <SelectField name={name} scoreScale={scoreScale} />;
  }
  return <div>FormField</div>;
};

export default FormField;
