import React from 'react';
import { FieldError, useFormContext } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';
import { get } from 'lodash';

type Props = {
  disabled?: boolean;
  name: string;
  title: string;
  isRequired?: boolean;
};

const ScoreInput = ({ disabled, name, title, isRequired }: Props) => {
  const formMethods = useFormContext();
  const errorMessage = (get(formMethods.formState.errors, name) as FieldError)
    ?.message;
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-2 rounded border border-black p-2">
        <p className="w-full flex-1">{title}</p>
        <input
          type="number"
          disabled={disabled}
          className="w-[80px] shrink-0 rounded border border-gray-500 p-1 outline-none disabled:cursor-not-allowed"
          {...formMethods.register(name, {
            required: {
              value: !!isRequired,
              message: 'This field is required',
            },
            valueAsNumber: true,
          })}
        />
      </div>
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};

export default ScoreInput;
