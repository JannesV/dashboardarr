import { Field, InputType } from "@nestjs/graphql";
import { CalendarWeekStart } from "./calendarWeekStart.enum";

@InputType()
export class CalendarModuleInput {
  @Field(() => CalendarWeekStart)
  startOfWeek: CalendarWeekStart;
}
