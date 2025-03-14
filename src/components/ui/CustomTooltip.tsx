import React from 'react';
import { Tooltip, TooltipProps } from '@mui/material';

/**
 * Custom tooltip component extending Material UI Tooltip
 */
const CustomTooltip = ({ children, title, ...props }: TooltipProps) => {
  return (
    <Tooltip
      title={title}
      arrow
      placement="top"
      enterTouchDelay={0}
      leaveTouchDelay={3000}
      {...props}
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
