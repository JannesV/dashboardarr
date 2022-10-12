import { ModuleType } from "@dashboardarr/common";
import { Field, ObjectType } from "@nestjs/graphql";
import { ModuleItem } from "src/configs/models/moduleItem.model";
import { ModulePosition } from "src/configs/models/modulePosition.model";
import { Service } from "src/services/models/service.model";
import { CalendarWeekStart } from "./calendarWeekStart.enum";

@ObjectType({
  implements: () => [ModuleItem],
})
export class CalendarModule implements ModuleItem {
  id: string;
  type: ModuleType;
  position: ModulePosition;

  serviceIds: string[];

  @Field(() => [Service])
  services: Service[];

  @Field(() => CalendarWeekStart)
  startOfWeek: CalendarWeekStart;
}
