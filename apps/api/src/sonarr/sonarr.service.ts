import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "src/configs/config.service";
import { SearchResult } from "src/search/searchResult.model";
import { TvCalendarItem } from "../calendar/models/tvCalendarItem.model";
import { SonarrClient } from "./sonarr.client";
import { SONARR_CLIENT } from "./sonarr.const";
import { CoverType } from "./sonarr.types";

@Injectable()
export class SonarrService {
  constructor(
    @Inject(SONARR_CLIENT) private sonarrClients: SonarrClient[],
    private configService: ConfigService
  ) {}

  public async getCalendar(
    startDate: Date,
    endDate: Date
  ): Promise<TvCalendarItem[]> {
    const items = await Promise.all(
      this.sonarrClients.map(async (client) => {
        const response = await client.getCalendar(startDate, endDate);

        return response.map<TvCalendarItem>((item) => {
          const image = item.series.images.find(
            (img) => img.coverType === CoverType.Poster
          );

          return {
            airDate: new Date(item.airDateUtc),
            episodeNumber: item.episodeNumber,
            episodeTitle: item.title,
            imdbId: item.series.imdbId,
            seasonNumber: item.seasonNumber,
            seriesTitle: item.series.title,
            tvDbId: item.series.tvdbId,
            poster: image?.url || undefined,
            genres: item.series.genres,
            overview: item.overview || "",
          };
        });
      })
    );

    return items.flat();
  }

  public async searchItems(): Promise<SearchResult[]> {
    const series = await Promise.all(
      this.sonarrClients.map(async (client) => {
        const series = await client.series();

        const service = await this.configService.getServiceById(client.id);
        const url = service.externalUrl || service.url;
        return series.map<SearchResult>((s) => {
          const image = s.images.find(
            (img) => img.coverType === CoverType.Poster
          );
          return {
            type: "Sonarr",
            title: s.title,
            image: image
              ? `/sonarr/images/${client.id}${image.url}`
              : undefined,
            url: `${url}/series/${s.titleSlug}`,
          };
        });
      })
    );

    return series.flat();
  }
}
