import { format, isAfter, parseISO } from "date-fns";

export function formatDate(date: string, formatStr: string) {
  return format(parseISO(date), formatStr);
}

export function isDateAfter(date: string, dateToCompare: string) {
  return isAfter(parseISO(date), parseISO(dateToCompare));
}
