import { Field } from "@headlessui/react";
import React from "react";
import { Controller, FieldError, useFormContext } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { get } from "lodash";

type Props = {
  disabled?: boolean;
  name: string;
};

const TextArea = ({ disabled, name }: Props) => {
  const formMethods = useFormContext();
  const errorMessage = (get(formMethods.formState.errors, name) as FieldError)
    ?.message;
  return (
    <div className="size-full">
      <Field className="w-full overflow-hidden rounded-md border border-black">
        <div className="relative">
          <Controller
            render={({ field }) => {
              return (
                <textarea
                  id={name}
                  disabled={disabled}
                  className="w-full p-2 outline-none disabled:cursor-not-allowed"
                  placeholder=""
                  rows={5}
                  {...field}
                ></textarea>
              );
            }}
            name={name}
            rules={{
              required: {
                value: true,
                message: "This field is required",
              },
            }}
            control={formMethods.control}
          />
        </div>
      </Field>
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};
export default TextArea;
