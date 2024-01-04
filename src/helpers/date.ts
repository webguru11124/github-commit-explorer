import { formatDistanceToNow } from "date-fns";

export function formatDate(date: string) {
  return `${formatDistanceToNow(new Date(date), { addSuffix: true })}`;
}
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export function getWeekday(date: number) {
  return days[date];
}
