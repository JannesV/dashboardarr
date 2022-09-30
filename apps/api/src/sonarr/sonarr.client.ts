import axios, { AxiosInstance } from "axios";
import { Series, SonarrCalendarItem } from "./sonarr.types";

interface SonarrClientOptions {
  apiUrl: string;
  apiKey: string;
  id: string;
}

export class SonarrClient {
  private readonly apiClient: AxiosInstance;
  public readonly id: string;

  constructor(private readonly options: SonarrClientOptions) {
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
    const response = await this.apiClient.get<Series[]>("/api/series", {});

    return response.data;
  }
}
