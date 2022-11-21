import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "src/configs/config.service";
import { SearchResult } from "src/search/searchResult.model";
import { MovieCalendarItem } from "../calendar/models/movieCalendarItem.model";
import { MediaCoverTypes } from "./api/data-contracts";
import { RadarrClient } from "./radarr.client";
import { RADARR_CLIENT } from "./radarr.const";

@Injectable()
export class RadarrService {
  constructor(
    @Inject(RADARR_CLIENT) private radarrClients: RadarrClient[],
    private configService: ConfigService
  ) {}

  public async getCalendar(opts: {
    startDate: Date;
    endDate: Date;
  }): Promise<MovieCalendarItem[]> {
    const items = await Promise.all(
      this.radarrClients.map(async (client) => {
        const response = await client.getCalendar(opts);

        return response.map<MovieCalendarItem>((item) => {
          const image = item.images?.find(
            (img) => img.coverType === MediaCoverTypes.Poster
          );

          return {
            genres: item.genres || [],
            inCinemasDate: item.inCinemas
              ? new Date(item.inCinemas)
              : undefined,
            digitalDate: item.digitalRelease
              ? new Date(item.digitalRelease)
              : undefined,
            imdbId: item.imdbId || "",
            movieTitle: item.title || "",
            poster: image?.url || "",
            overview: item.overview || "",
            voteAverage: item.ratings.tmdb.value,
          };
        });
      })
    );

    return items.flat();
  }

  public async searchItems(): Promise<SearchResult[]> {
    const movies = await Promise.all(
      this.radarrClients.map(async (client) => {
        const movies = await client.movies();

        const service = await this.configService.getServiceById(client.id);
        const url = service.externalUrl || service.url;

        return movies.data.map<SearchResult>((m) => {
          const image = m.images.find(
            (img) => img.coverType === MediaCoverTypes.Poster
          );
          return {
            title: m.title,
            type: "Radarr",
            url: `${url}/movie/${m.titleSlug}`,
            image: image
              ? `/radarr/images/${client.id}${image.url}`
              : undefined,
          };
        });
      })
    );

    return movies.flat();
  }
}
