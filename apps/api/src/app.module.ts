import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import { join } from "path";
import { AppController } from "./app.controller";
import { CalendarModule } from "./calendar/calendar.module";
import { ConfigModule } from "./configs/config.module";
import { DockerModule } from "./docker/docker.module";
import { RadarrModule } from "./radarr/radarr.module";
import { SearchModule } from "./search/search.module";
import { SonarrModule } from "./sonarr/sonarr.module";
import { SabnzbdModule } from "./sabnzbd/sabnzbd.module";
import { UsenetModule } from "./usenet/usenet.module";
import { ServicesModule } from "./services/services.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { CacheModule } from "./cache/cache.module";
import { SystemInfoModule } from "./systemInfo/systemInfo.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    ConfigModule,
    DockerModule,
    SearchModule,
    RadarrModule,
    SonarrModule,
    CalendarModule,
    SabnzbdModule,
    UsenetModule,
    ServicesModule,
    CacheModule,
    SystemInfoModule,
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      installSubscriptionHandlers: true,
      playground: true,

      subscriptions: {
        "graphql-ws": true,
        "subscriptions-transport-ws": true,
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: "./web",
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
