import { styled, TooltipProps, Tooltip, tooltipClasses } from "@mui/material";
import React from "react";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(0, 0, 0, 0.87)",
    width: 500,
    maxWidth: "100%",
    padding: 12,
    color: "#FFF",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export default CustomTooltip;
