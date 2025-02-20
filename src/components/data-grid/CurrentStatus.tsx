import React, { useMemo } from "react";

type Props = {
  currentStatus: "waitingFillForm" | "waitingManager" | "waitingBO";
};

const CurrentStatus = ({ currentStatus }: Props) => {
  const status = useMemo(() => {
    if (currentStatus === "waitingFillForm") {
      return "Chờ điền đơn";
    }
    if (currentStatus === "waitingManager") {
      return "Chờ quản lý điền đơn";
    }
    if (currentStatus === "waitingBO") {
      return "BO tổng hợp";
    }
  }, [currentStatus]);

  const bgColor = useMemo(() => {
    if (currentStatus === "waitingFillForm") {
      return "bg-[#FFE874]";
    }
    if (currentStatus === "waitingManager") {
      return "bg-[#78C0FF]";
    }
    if (currentStatus === "waitingBO") {
      return "bg-[#5AFF8B]";
    }
  }, [currentStatus]);

  return (
    <div
      className={`mx-auto flex h-10 min-h-fit w-fit max-w-[120px] items-center justify-center text-wrap rounded border border-black px-2 ${bgColor}`}
    >
      <span>{status}</span>
    </div>
  );
};

export default CurrentStatus;
