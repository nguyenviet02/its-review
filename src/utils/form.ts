import { FORM_TYPES } from "@/types";

// Developer positions for form type determination
const developerPositions = [
  "dev",
  "developer",
  "fullstack",
  "frontend",
  "backend",
  "mobile",
];

/**
 * Determine the appropriate form type based on job position and manager status
 */
export const getFormType = (
  jobPosition: string,
  isManager: boolean,
): FORM_TYPES => {
  let formType = FORM_TYPES.UNSET;
  const jobPositionFormatted = jobPosition
    ?.trim()
    ?.toLowerCase()
    ?.replaceAll(/[\s\-_.,!@#$%^&*()]/g, "");

  if (isManager) {
    if (developerPositions.includes(jobPositionFormatted)) {
      formType = FORM_TYPES.FOR_DEV_MANAGER_V1;
    } else if (jobPositionFormatted === "its") {
      formType = FORM_TYPES.FOR_ITS_MANAGER_V1;
    } else {
      formType = FORM_TYPES.FOR_ITS_MANAGER_V1;
    }
  } else {
    if (developerPositions.includes(jobPositionFormatted)) {
      formType = FORM_TYPES.FOR_DEV_V1;
    } else if (jobPositionFormatted === "its") {
      formType = FORM_TYPES.FOR_ITS_V1;
    } else {
      formType = FORM_TYPES.FOR_ITS_V1;
    }
  }

  console.log("☠️ ~ formType:", formType);
  return formType;
};
