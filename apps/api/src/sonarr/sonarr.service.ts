import { flatten, Inject, Injectable } from "@nestjs/common";
import Fuse from "fuse.js";
import { SearchResult } from "src/search/searchResult.model";
import { TvCalendarItem } from "../calendar/models/tvCalendarItem.model";
import { SonarrClient } from "./sonarr.client";
import { SONARR_CLIENT } from "./sonarr.const";
import { CoverType } from "./sonarr.types";

@Injectable()
export class SonarrService {
  constructor(@Inject(SONARR_CLIENT) private sonarrClients: SonarrClient[]) {}

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

    return flatten(items);
  }

  public async search(query: string): Promise<SearchResult[]> {
    const series = await Promise.all(
      this.sonarrClients.map(async (client) => {
        const series = await client.series();

        return series.map<SearchResult>((s) => {
          const image = s.images.find(
            (img) => img.coverType === CoverType.Poster
          );
          return {
            type: "Sonarr",
            title: s.title,
            image: image
              ? `http://localhost:3001/sonarr/images/${client.id}${image.url}`
              : undefined,
          };
        });
      })
    );

    const fuse = new Fuse(flatten(series), {
      keys: ["title"],
      threshold: 0.4,
      includeMatches: true,
      includeScore: true,
    });

    return fuse.search(query).map((r) => ({
      ...r.item,
    }));
  }
}
