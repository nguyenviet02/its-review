import { ICriterion, Field } from "@/types";
import React from "react";
import FormField from "./FormField";

type Props = {
  fields: Field[];
};

const PageReview = ({ fields }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {fields.map((field: Field) => {
        return (
          <div key={field.number}>
            <h2 className="mb-1 text-xl font-bold">
              {`${field.number}. ${field.title}`}
            </h2>
            {field?.description && (
              <h3 className="mb-2 text-sm font-normal opacity-80">
                {field.description}
              </h3>
            )}
            <div className="flex w-full flex-col gap-2">
              {field.criterions.map((criterion: ICriterion) => {
                return (
                  <div key={criterion.number} className="flex flex-col gap-2">
                    <FormField criterion={criterion} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PageReview;
