import { registerEnumType } from "@nestjs/graphql";

export enum CalendarWeekStart {
  SUNDAY = "SUNDAY",
  MONDAY = "MONDAY",
}

registerEnumType(CalendarWeekStart, { name: "CalendarWeekStart" });
