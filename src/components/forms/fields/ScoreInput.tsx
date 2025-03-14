import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  disabled?: boolean;
  name: string;
  title: string;
};

const ScoreInput = ({ disabled, name, title }: Props) => {
  const formMethods = useFormContext();
  return (
    <div className="flex items-center gap-2 rounded border border-black p-2">
      <p className="w-full flex-1">{title}</p>
      <input
        type="number"
        disabled={disabled}
        className="w-[80px] shrink-0 rounded border border-gray-500 p-1 outline-none disabled:cursor-not-allowed"
        {...formMethods.register(name)}
      />
    </div>
  );
};

export default ScoreInput;
