import moment from "moment";

export function getDayinText(day: number): string {
  return {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  }[day];
}

export function parseDate(date: Date): string {
  return moment(date).format("ddd, MMM Do [at] HH:mm");
}
