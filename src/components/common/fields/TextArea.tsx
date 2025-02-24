import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
};

const TextArea = ({ name }: Props) => {
  const formMethods = useFormContext();
  return (
    <div className="size-full border border-black">
      <textarea
        id={name}
        {...formMethods.register(name)}
        className="w-full p-2 outline-none"
        placeholder="Điền vào ô trống..."
        rows={5}
      ></textarea>
    </div>
  );
};

export default TextArea;
