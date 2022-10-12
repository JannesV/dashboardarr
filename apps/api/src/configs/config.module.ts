import { Global, Module } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { ConfigResolver } from "./config.resolver";
import { ButtonModuleResolver } from "./buttonModule.resolver";

@Global()
@Module({
  providers: [ConfigService, ConfigResolver, ButtonModuleResolver],
  exports: [ConfigService],
})
export class ConfigModule {}
