import React from "react";

type ErrorMessageProps = {
  errorMessage?: string;
};

/**
 * Form field error message component
 */
const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  if (!errorMessage) return null;
  
  return (
    <div className="text-xs font-normal text-red-500">
      {errorMessage}
    </div>
  );
};

export default ErrorMessage;
