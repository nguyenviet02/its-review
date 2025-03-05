import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  disabled?: boolean;
  name: string;
};

const TextArea = ({ disabled, name }: Props) => {
  const formMethods = useFormContext();
  return (
    <div className="size-full border border-black">
      <textarea
        id={name}
        disabled={disabled}
        {...formMethods.register(name)}
        className="w-full p-2 outline-none disabled:cursor-not-allowed"
        placeholder=""
        rows={5}
      ></textarea>
    </div>
  );
};

export default TextArea;
