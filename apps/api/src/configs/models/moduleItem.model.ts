import { Field, InterfaceType } from "@nestjs/graphql";
import { CalendarModule } from "src/calendar/models/calendarModule.model";
import { UsenetModule } from "src/usenet/models/usenetModule.model";
import { ButtonModule } from "./buttonModule.model";
import { ModulePosition } from "./modulePosition.model";

export enum ModuleType {
  Button = "button",
  Usenet = "usenet",
  Calendar = "calendar",
}

@InterfaceType({
  resolveType(item: ModuleItem) {
    if (item.type === ModuleType.Button) {
      return ButtonModule;
    } else if (item.type === ModuleType.Usenet) {
      return UsenetModule;
    } else if (item.type === ModuleType.Calendar) {
      return CalendarModule;
    }
  },
})
export abstract class ModuleItem {
  @Field()
  id: string;

  @Field(() => ModulePosition)
  position: ModulePosition;

  type: ModuleType;
}
