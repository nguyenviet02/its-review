import React from "react";

type Props = {
  isLoading: boolean;
  children?: React.ReactNode;
};

const Loading = ({ isLoading, children }: Props) => {
	if (isLoading) {
		return (
			<div className="flex size-full h-[300px] items-center justify-center">
				<div className="animate-spin rounded-full border-4 border-t-4 border-t-blue-500 border-gray-200 h-24 w-24"></div>
			</div>
		);
	}
  return <>{children}</>;
};

export default Loading;
