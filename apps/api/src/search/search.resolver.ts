import { Resolver, Query, Args } from "@nestjs/graphql";
import Fuse from "fuse.js";
import { RadarrService } from "src/radarr/radar.service";
import { SonarrService } from "src/sonarr/sonarr.service";
import { SearchResult } from "./searchResult.model";

@Resolver()
export class SearchResolver {
  constructor(
    private sonarrService: SonarrService,
    private radarrService: RadarrService
  ) {}

  @Query(() => [SearchResult])
  async search(@Args("search") search: string): Promise<SearchResult[]> {
    const results = await Promise.all([
      this.sonarrService.searchItems(),
      this.radarrService.searchItems(),
    ]);

    const fuse = new Fuse(results.flat(), {
      keys: ["title"],
      threshold: 0.4,
      includeMatches: true,
      includeScore: true,
    });

    return fuse.search(search).map((r) => ({
      ...r.item,
    }));
  }
}
