import { ModuleType } from "@dashboardarr/common";
import { Field, InputType } from "@nestjs/graphql";
import { CalendarModuleInput } from "src/calendar/models/calendarModuleInput.model";
import { UsenetModuleInput } from "src/usenet/models/usenetModuleInput.model";
import { ButtonModuleInput } from "./buttonModuleInput.model";

@InputType()
export class ModuleItemInput {
  @Field(() => UsenetModuleInput, { nullable: true })
  [ModuleType.Usenet]?: UsenetModuleInput;

  @Field(() => ButtonModuleInput, { nullable: true })
  [ModuleType.Button]?: ButtonModuleInput;

  @Field(() => CalendarModuleInput, { nullable: true })
  [ModuleType.Calendar]?: CalendarModuleInput;
}
