import { RadarrApi } from "./api/Api";

interface RadarrClientOptions {
  apiUrl: string;
  apiKey: string;
  id: string;
}

export class RadarrClient {
  private apiClient: RadarrApi;
  public id: string;
  constructor(private readonly options: RadarrClientOptions) {
    this.apiClient = new RadarrApi({
      baseURL: this.options.apiUrl,
      params: {
        apiKey: this.options.apiKey,
      },
    });
    this.id = this.options.id;
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
    const response = await this.apiClient.v3MovieList();

    return response;
  }
}
