import { format, isAfter } from "date-fns";

export function formatDate(date: string, formatStr: string) {
  return format(new Date(date), formatStr);
}

export function isDateAfter(date: string, dateToCompare: string) {
  return isAfter(new Date(date), new Date(dateToCompare));
}
