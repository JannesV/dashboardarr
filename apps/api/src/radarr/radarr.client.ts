import { CacheManager } from "src/cache/cacheManager";
import { RadarrApi } from "./api/Api";
import { MovieResource } from "./api/data-contracts";

interface RadarrClientOptions {
  apiUrl: string;
  apiKey: string;
  id: string;
}

export class RadarrClient {
  private apiClient: RadarrApi;
  public id: string;
  constructor(
    options: RadarrClientOptions,
    private readonly cacheManager: CacheManager
  ) {
    this.apiClient = new RadarrApi({
      baseURL: options.apiUrl,
      params: {
        apiKey: options.apiKey,
      },
    });
    this.id = options.id;
  }

  public async getCalendar(opts: { startDate: Date; endDate: Date }) {
    const response = await this.apiClient.v3CalendarList({
      start: opts.startDate.toISOString(),
      end: opts.endDate.toISOString(),
    });

    if (!Array.isArray(response.data)) {
      throw new Error("Radarr did not return a valid response");
    }

    return response.data;
  }

  public async movies() {
    let movies: MovieResource[] = await this.cacheManager.get("radarr-movies");

    if (!movies) {
      const response = await this.apiClient.v3MovieList();

      if (!Array.isArray(response.data)) {
        throw new Error("Radarr did not return a valid response");
      }

      movies = response.data;
      await this.cacheManager.set("radarr-movies", movies);
    }

    return movies;
  }
}
