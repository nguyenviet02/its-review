import React, { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

type Props = {
  name: string;
};

const MultiInput = ({ name }: Props) => {
  const formMethods = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: name, // unique name for your Field Array
  });
  useEffect(() => {
    if (fields.length === 0 && fields.length < 1) {
      append({ value: "" });
    }
  }, [append, fields.length]);
  return (
    <div className="flex flex-col gap-1">
      {fields.map((field, index) => {
        return (
          <div
            key={field.id}
            className="flex gap-2 overflow-hidden rounded border border-gray-300 px-4 py-2"
          >
            <input
              className="flex-1 border-none outline-none"
              placeholder="Điền vào chỗ trống"
              type="text"
              {...formMethods.register(`${name}.${index}.value`)}
            />
            <button
              className="w-fit shrink-0"
              onClick={() => {
                append({ value: "" });
              }}
            >
              Add
            </button>
            <button className="w-fit shrink-0" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default MultiInput;
