import { FactoryProvider, Module, Scope } from "@nestjs/common";
import { CacheManager } from "src/cache/cacheManager";
import { ConfigService } from "../configs/config.service";
import { ServiceType } from "../services/models/serviceType.enum";
import { RadarrService } from "./radar.service";
import { RadarrClient } from "./radarr.client";
import { RADARR_CLIENT } from "./radarr.const";
import { RadarrController } from "./radarr.controller";

const ApiProvider: FactoryProvider<RadarrClient[]> = {
  provide: RADARR_CLIENT,
  async useFactory(configService: ConfigService, cacheManager: CacheManager) {
    const services = await configService.getServices(ServiceType.Radarr);
    return services.map(
      (s) =>
        new RadarrClient(
          { apiKey: s.apiKey!, apiUrl: s.url, id: s.id },
          cacheManager
        )
    );
  },
  inject: [ConfigService, CacheManager],
  scope: Scope.REQUEST,
};

@Module({
  providers: [RadarrService, ApiProvider],
  exports: [RadarrService],
  controllers: [RadarrController],
})
export class RadarrModule {}
