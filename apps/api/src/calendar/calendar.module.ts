import { Module } from "@nestjs/common";
import { RadarrModule } from "../radarr/radarr.module";
import { SonarrModule } from "../sonarr/sonarr.module";
import { CalendarResolver } from "./calendar.resolver";
import { CalendarModuleResolver } from "./calendarModule.resolver";

@Module({
  providers: [CalendarResolver, CalendarModuleResolver],
  imports: [RadarrModule, SonarrModule],
})
export class CalendarModule {}
