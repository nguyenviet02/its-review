import { MinusCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

type Props = {
  disabled?: boolean;
  name: string;
};

const MultiInput = ({ disabled, name }: Props) => {
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
    <div className="flex flex-col items-center gap-1">
      {fields.map((field, index) => {
        return (
          <div
            key={field.id}
            className="flex w-full gap-2 overflow-hidden rounded border border-gray-300 px-4 py-2"
          >
            <input
              disabled={disabled}
              className="flex-1 border-none outline-none disabled:cursor-not-allowed"
              placeholder="Input here"
              type="text"
              {...formMethods.register(`${name}.${index}.value`)}
            />
            <button className="w-fit shrink-0" onClick={() => remove(index)}>
              <MinusCircleIcon className="size-6" />
            </button>
          </div>
        );
      })}
      <button
        className="w-fit shrink-0 rounded border border-black px-4 py-1"
        onClick={() => {
          append({ value: "" });
        }}
      >
        Thêm mới
      </button>
    </div>
  );
};

export default MultiInput;
