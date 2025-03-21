import { IScoreScale } from "@/types";
import { Field } from "@headlessui/react";
import { memo } from "react";
import { Controller, FieldError, useFormContext } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { get } from "lodash";
import { MenuItem, Select } from "@mui/material";

type SelectFieldProps = {
  disabled?: boolean;
  name: string;
  scoreScale?: IScoreScale[];
	isRequired?: boolean;
};

/**
 * Select field component for form fields with score scales
 */
function SelectField({ disabled, name, scoreScale, isRequired }: SelectFieldProps) {
  const formMethods = useFormContext();
  const errorMessage = (get(formMethods.formState.errors, name) as FieldError)
    ?.message;
    
  return (
    <div className="flex flex-col gap-1">
      <Field className="w-full rounded-md border border-gray-300">
        <div className="relative">
          <Controller
            render={({ field }) => {
              return (
                <Select
                  MenuProps={{ className: "w-[200px]" }}
                  disabled={disabled}
                  defaultValue=""
                  className="w-full appearance-none text-wrap bg-transparent"
                  sx={{
                    '&.Mui-disabled': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.26)'
                      },
                      '& .MuiSelect-select': {
                        color: 'rgba(0, 0, 0, 0.38)',
                        WebkitTextFillColor: 'rgba(0, 0, 0, 0.38)',
                        cursor: 'not-allowed !important'
                      },
                      '& .MuiInputBase-input': {
                        cursor: 'not-allowed !important'
                      },
                      opacity: 0.7,
                      cursor: 'not-allowed !important'
                    },
                  }}
                  {...field}
                >
                  <MenuItem value={""} disabled>
                    Please select
                  </MenuItem>
                  {scoreScale?.map((scale: IScoreScale, index) => {
                    return (
                      <MenuItem
                        key={index}
                        className="!whitespace-normal"
                        value={Number(scale.score)}
                      >
                        {scale.description}
                      </MenuItem>
                    );
                  })}
                </Select>
              );
            }}
            name={name}
            defaultValue={""}
            rules={{
              required: {
                value: !!isRequired,
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
}

export default memo(SelectField);
