import { Module } from "@nestjs/common";
import { RadarrModule } from "src/radarr/radarr.module";
import { SonarrModule } from "src/sonarr/sonarr.module";
import { SearchResolver } from "./search.resolver";

@Module({
  providers: [SearchResolver],
  imports: [SonarrModule, RadarrModule],
})
export class SearchModule {}
