import React from "react";
import { useFormContext } from "react-hook-form";

type ScoreInputProps = {
  disabled?: boolean;
  name: string;
  title: string;
  min?: number;
  max?: number;
  step?: number;
};

/**
 * Score input field for numerical assessment scores
 */
const ScoreInputField = ({ 
  disabled = false, 
  name, 
  title,
  min = 0,
  max = 10,
  step = 0.1
}: ScoreInputProps) => {
  const formMethods = useFormContext();
  
  return (
    <div className="flex items-center gap-2 rounded border border-black p-2">
      <p className="w-full flex-1">{title}</p>
      <input
        type="number"
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className="w-[80px] shrink-0 rounded border border-gray-500 p-1 outline-none disabled:cursor-not-allowed"
        {...formMethods.register(name, {
          valueAsNumber: true,
        })}
      />
    </div>
  );
};

export default ScoreInputField;
