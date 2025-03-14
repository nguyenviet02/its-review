import { FORM_STATUS } from "@/types";
import React from 'react';

type StatusBadgeProps = {
  status: string;
  className?: string;
};

/**
 * Status badge component for showing review status
 */
const StatusBadge = ({ status, className = '' }: StatusBadgeProps) => {
  // Define status colors and labels
  const statusConfig = {
    [FORM_STATUS.WAITING_FILL_FORM]: {
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      label: 'Waiting for Employee'
    },
    [FORM_STATUS.WAITING_MANAGER]: {
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      label: 'Waiting for Manager'
    },
    [FORM_STATUS.WAITING_BO]: {
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      label: 'Completed'
    },
    default: {
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
      label: 'Unknown Status'
    }
  };

  // Get config for current status or use default
  const config = statusConfig[status as FORM_STATUS] || statusConfig.default;

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bgColor} ${config.textColor} ${className}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
