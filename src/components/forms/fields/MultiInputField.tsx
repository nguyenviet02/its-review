import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

type MultiInputProps = {
  disabled?: boolean;
  name: string;
  placeholder?: string;
  addButtonLabel?: string;
};

/**
 * Multiple input field that allows adding/removing items
 */
const MultiInputField = ({ 
  disabled = false, 
  name,
  placeholder = "Input here",
  addButtonLabel = "Add new" 
}: MultiInputProps) => {
  const formMethods = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name
  });

  // Initialize with one empty field if none exist
  useEffect(() => {
    if (fields.length === 0) {
      append({ value: "" });
    }
  }, [append, fields.length]);
  
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Input fields */}
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex w-full gap-2 overflow-hidden rounded border border-gray-300 px-4 py-2"
        >
          <input
            disabled={disabled}
            className="flex-1 border-none outline-none disabled:cursor-not-allowed"
            placeholder={placeholder}
            type="text"
            {...formMethods.register(`${name}.${index}.value`)}
          />
          <button 
            className="w-fit shrink-0" 
            onClick={() => remove(index)}
            type="button"
            disabled={fields.length <= 1}
          >
            <MinusCircleIcon className="size-6 text-gray-500 hover:text-red-500" />
          </button>
        </div>
      ))}
      
      {/* Add button */}
      <button
        className="w-fit shrink-0 rounded border border-black px-4 py-1 hover:bg-gray-100"
        onClick={() => append({ value: "" })}
        type="button"
        disabled={disabled}
      >
        <div className="flex items-center gap-1">
          <PlusCircleIcon className="size-4" />
          <span>{addButtonLabel}</span>
        </div>
      </button>
    </div>
  );
};

export default MultiInputField;
