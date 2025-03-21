/**
 * Format a number to two digits (add leading zero if needed)
 */
export const formatNumberToTwoDigits = (number: number): string => {
  return number < 10 ? `0${number}` : `${number}`;
};

/**
 * Format date to DD/MM/YYYY
 */
export const formatDate = (date: string): string => {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const year = d.getFullYear();
	const hour = d.getHours();
	const minute = d.getMinutes();

  return `${formatNumberToTwoDigits(day)}/${formatNumberToTwoDigits(month)}/${year} ${formatNumberToTwoDigits(hour)}:${formatNumberToTwoDigits(minute)}`;
};
