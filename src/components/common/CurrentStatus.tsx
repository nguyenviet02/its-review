import React, { useMemo } from "react";

type Props = {
  currentStatus: "waiting_employee" | "waiting_manager" | "completed";
};

const CurrentStatus = ({ currentStatus }: Props) => {
  const status = useMemo(() => {
    if (currentStatus === "waiting_employee") {
      return "Waiting Employee";
    }
    if (currentStatus === "waiting_manager") {
      return "Waiting Manager";
    }
    if (currentStatus === "completed") {
      return "Completed";
    }
  }, [currentStatus]);

  const bgColor = useMemo(() => {
    if (currentStatus === "waiting_employee") {
      return "bg-[#FFE874]";
    }
    if (currentStatus === "waiting_manager") {
      return "bg-[#78C0FF]";
    }
    if (currentStatus === "completed") {
      return "bg-[#5AFF8B]";
    }
  }, [currentStatus]);

  return (
    <div
      className={`mx-auto flex min-h-fit w-fit max-w-[120px] items-center justify-center text-wrap rounded border border-black px-2 ${bgColor}`}
    >
      {status}
    </div>
  );
};

export default CurrentStatus;
