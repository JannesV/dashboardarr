import axios, { AxiosInstance } from "axios";
import { CacheManager } from "src/cache/cacheManager";
import { Series, SonarrCalendarItem } from "./sonarr.types";

interface SonarrClientOptions {
  apiUrl: string;
  apiKey: string;
  id: string;
}

export class SonarrClient {
  private readonly apiClient: AxiosInstance;
  public readonly id: string;

  constructor(
    options: SonarrClientOptions,
    private readonly cacheManager: CacheManager
  ) {
    this.apiClient = axios.create({
      baseURL: options.apiUrl,
      params: {
        apiKey: options.apiKey,
      },
    });
    this.id = options.id;
  }

  public async getCalendar(
    startDate: Date,
    endDate: Date
  ): Promise<SonarrCalendarItem[]> {
    const response = await this.apiClient.get("/api/calendar", {
      params: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      },
    });

    return response.data;
  }

  public async series(): Promise<Series[]> {
    let series: Series[] = await this.cacheManager.get("sonarr-series");

    if (!series) {
      const response = await this.apiClient.get<Series[]>("/api/series", {});

      if (!Array.isArray(response.data)) {
        throw new Error("Sonarr did not return a valid response");
      }

      series = response.data;
      await this.cacheManager.set("sonarr-series", series);
    }

    return series;
  }
}
