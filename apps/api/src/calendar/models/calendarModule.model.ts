import { Field, ObjectType } from "@nestjs/graphql";
import {
  ConfigModule,
  ModuleType,
} from "../../configs/models/configModule.model";
import { CalendarWeekStart } from "./calendarWeekStart.enum";

@ObjectType({
  implements: () => [ConfigModule],
})
export class CalendarModule implements ConfigModule {
  @Field(() => CalendarWeekStart)
  weekStart: CalendarWeekStart;

  id: string;

  enabled: boolean;

  type: ModuleType;
}
