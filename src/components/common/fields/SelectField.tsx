import { IScoreScale } from "@/types";
import { Field, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { memo } from "react";
import { FieldError, useFormContext } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { get } from "lodash";

type Props = {
  name: string;
  scoreScale?: IScoreScale[];
};

function SelectField({ name, scoreScale }: Props) {
  const formMethods = useFormContext();
  const errorMessage = (get(formMethods.formState.errors, name) as FieldError)
    ?.message;
  return (
    <div className="flex flex-col gap-1">
      <Field className="w-full rounded-md border border-gray-300">
        <div className="relative">
          <Select
            {...formMethods.register(name, {
              valueAsNumber: true,
              required: "Trường này không được để trống",
              validate: (value) => value !== "",
            })}
            defaultValue=""
            className="h-full w-full appearance-none bg-transparent px-4 py-2"
          >
            <option value={""} disabled>
              Chọn điểm
            </option>
            {scoreScale?.map((scale: IScoreScale, index) => {
              return (
                <option key={index} value={Number(scale.score)}>
                  {scale.description}
                </option>
              );
            })}
          </Select>
          <ChevronDownIcon className="group pointer-events-none absolute right-4 top-1/2 size-6 -translate-y-1/2 fill-black" />
        </div>
      </Field>
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
}

export default memo(SelectField);
