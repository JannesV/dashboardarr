import { Field, ObjectType } from "@nestjs/graphql";
import { ConfigModule } from "../../configs/models/configModule.model";
import { CalendarWeekStart } from "./calendarWeekStart.enum";

@ObjectType()
export class CalendarConfig extends ConfigModule {
  @Field(() => CalendarWeekStart)
  weekStart: CalendarWeekStart;
}
