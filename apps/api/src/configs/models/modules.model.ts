import { createUnionType } from "@nestjs/graphql";
import { CalendarModule } from "../../calendar/models/calendarModule.model";
import { DockerModule } from "../../docker/models/dockerModule.model";
import { UsenetModule } from "../../usenet/usenetModule.model";

export const Module = createUnionType({
  name: "Module",
  types: () => [CalendarModule, DockerModule, UsenetModule] as const,
  resolveType(item: CalendarModule | DockerModule | UsenetModule) {
    return UsenetModule;
  },
});
