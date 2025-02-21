import { ScoreScale } from "@/types";
import { Field, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { memo } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  scoreScale?: ScoreScale[];
};

function SelectField({ name, scoreScale }: Props) {
  const methods = useFormContext();
  return (
    <div className="w-full rounded-md border border-gray-300">
      <Field>
        <div className="relative">
          <Select
            {...methods.register(name)}
            defaultValue=""
            className="h-full w-full appearance-none bg-transparent px-4 py-2"
          >
            <option value={""} disabled>
              Chọn điểm
            </option>
            {scoreScale?.map((scale: ScoreScale) => {
              return (
                <option key={scale.score} value={scale.score}>
                  {scale.description}
                </option>
              );
            })}
          </Select>
          <ChevronDownIcon
            className="group pointer-events-none absolute right-4 top-1/2 size-6 -translate-y-1/2 fill-black"
            aria-hidden="true"
          />
        </div>
      </Field>
    </div>
  );
}

export default memo(SelectField);
