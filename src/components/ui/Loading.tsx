import React from 'react';

type LoadingProps = {
  isLoading: boolean;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
};

/**
 * Loading spinner component with optional children
 */
const Loading = ({ isLoading, children, size = 'md' }: LoadingProps) => {
  // Size mapping for spinner
  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-24 w-24',
    lg: 'h-32 w-32',
  };

  if (isLoading) {
    return (
      <div className="flex size-full h-[300px] items-center justify-center">
        <div
          className={`animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500 ${sizeClasses[size]}`}
        ></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default Loading;
