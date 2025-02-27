import React from "react";

type Props = {
  errorMessage?: string;
};

const ErrorMessage = ({ errorMessage }: Props) => {
  if (!errorMessage) return null;
  return <p className="text-sm text-red-500">{errorMessage}</p>;
};

export default ErrorMessage;
