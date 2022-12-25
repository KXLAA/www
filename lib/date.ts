import { format, parseISO } from "date-fns";

export function formatDate(date: string, formatStr: string) {
  return format(parseISO(date), formatStr);
}
