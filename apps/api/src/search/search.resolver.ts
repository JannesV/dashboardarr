import { Resolver, Query, Args } from "@nestjs/graphql";
import { SonarrService } from "src/sonarr/sonarr.service";
import { SearchResult } from "./searchResult.model";

@Resolver()
export class SearchResolver {
  constructor(private sonarrService: SonarrService) {}

  @Query(() => [SearchResult])
  async search(@Args("search") search: string): Promise<SearchResult[]> {
    const results = await this.sonarrService.search(search);

    return results;
  }
}
