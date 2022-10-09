import { Field, InterfaceType } from "@nestjs/graphql";
import { CalendarModule } from "src/calendar/models/calendarModule.model";
import { DockerModule } from "src/docker/models/dockerModule.model";
import { UsenetModule } from "src/usenet/usenetModule.model";

export enum ModuleType {
  Docker = "docker",
  Usenet = "usenet",
  Calendar = "calendar",
}

@InterfaceType({
  resolveType(item: ConfigModule) {
    if (item.type === "docker") {
      return DockerModule;
    } else if (item.type === "usenet") {
      return UsenetModule;
    } else if (item.type === "calendar") {
      return CalendarModule;
    }
  },
})
export abstract class ConfigModule {
  @Field()
  id: string;

  @Field()
  enabled: boolean;

  type: ModuleType;
}
