import { memo } from "react";
import { useFormContext } from "react-hook-form";

type TextAreaProps = {
  disabled?: boolean;
  name: string;
  placeholder?: string;
  rows?: number;
};

/**
 * Text area field for multiline text input
 */
function TextAreaField({ 
  disabled = false, 
  name, 
  placeholder = "Please enter details here",
  rows = 4
}: TextAreaProps) {
  const formMethods = useFormContext();

  return (
    <div className="flex flex-col">
      <textarea
        disabled={disabled}
        placeholder={placeholder}
        className="resize-none rounded border border-gray-300 p-2 outline-none disabled:cursor-not-allowed"
        rows={rows}
        {...formMethods.register(name)}
      />
    </div>
  );
}

export default memo(TextAreaField);
