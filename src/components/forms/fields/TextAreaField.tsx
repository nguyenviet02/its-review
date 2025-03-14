import { get } from "lodash";
import { memo } from "react";
import { FieldError, useFormContext } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

type TextAreaProps = {
  disabled?: boolean;
  name: string;
  placeholder?: string;
  rows?: number;
  isRequired?: boolean;
};

/**
 * Text area field for multiline text input
 */
function TextAreaField({
  disabled = false,
  name,
  placeholder = "Please enter details here",
  rows = 4,
  isRequired,
}: TextAreaProps) {
  const formMethods = useFormContext();
  const errorMessage = (get(formMethods.formState.errors, name) as FieldError)
    ?.message;

  return (
    <div className="flex flex-col">
      <textarea
        disabled={disabled}
        placeholder={placeholder}
        className="resize-none rounded border border-gray-300 p-2 outline-none disabled:cursor-not-allowed"
        rows={rows}
        {...formMethods.register(name, {
          required: { value: !!isRequired, message: "This field is required" },
        })}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
}

export default memo(TextAreaField);
