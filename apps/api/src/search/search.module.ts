import { Module } from "@nestjs/common";
import { SonarrModule } from "src/sonarr/sonarr.module";
import { SearchResolver } from "./search.resolver";

@Module({
  providers: [SearchResolver],
  imports: [SonarrModule],
})
export class SearchModule {}
